import { getApprovedProducts } from '@/lib/products'
import { ShopClient } from './ShopClient'

export const revalidate = 60

// Serialize Firestore data for client components
// Converts Firestore Timestamps and other non-serializable objects to plain JSON
function serializeProduct(product: any) {
  const serialized: any = {
    id: String(product.id || ''),
    title: String(product.title || ''),
    imageUrl: String(product.imageUrl || ''),
    externalUrl: String(product.externalUrl || ''),
  }

  // Optional fields
  if (product.description) serialized.description = String(product.description)
  if (product.brandId) serialized.brandId = String(product.brandId)
  if (product.brandName) serialized.brandName = String(product.brandName)
  if (product.category) serialized.category = String(product.category)
  if (product.dropNumber !== null && product.dropNumber !== undefined) {
    serialized.dropNumber = typeof product.dropNumber === 'number' ? product.dropNumber : Number(product.dropNumber)
  }

  // Handle tags array
  if (Array.isArray(product.tags)) {
    serialized.tags = product.tags.map((tag: any) => String(tag))
  }

  // Convert Firestore Timestamps to ISO strings
  if (product.createdAt) {
    try {
      if (product.createdAt.toDate && typeof product.createdAt.toDate === 'function') {
        serialized.createdAt = product.createdAt.toDate().toISOString()
      } else if (product.createdAt instanceof Date) {
        serialized.createdAt = product.createdAt.toISOString()
      } else if (typeof product.createdAt === 'string') {
        serialized.createdAt = product.createdAt
      }
    } catch (e) {
      // Ignore timestamp conversion errors
    }
  }

  if (product.updatedAt) {
    try {
      if (product.updatedAt.toDate && typeof product.updatedAt.toDate === 'function') {
        serialized.updatedAt = product.updatedAt.toDate().toISOString()
      } else if (product.updatedAt instanceof Date) {
        serialized.updatedAt = product.updatedAt.toISOString()
      } else if (typeof product.updatedAt === 'string') {
        serialized.updatedAt = product.updatedAt
      }
    } catch (e) {
      // Ignore timestamp conversion errors
    }
  }

  return serialized
}

export default async function ShopPage() {
  // Fetch products server-side
  let products: Awaited<ReturnType<typeof getApprovedProducts>> = []

  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_DATA_FETCH === 'true') {
    try {
      const timeoutMs = 5000
      const timeoutPromise = (label: string) =>
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`${label} timeout after ${timeoutMs}ms`)), timeoutMs)
        )

      const productsResult = await Promise.race([
        getApprovedProducts(100),
        timeoutPromise('Products')
      ])

      products = productsResult
    } catch (error) {
      console.warn('Error fetching products:', error)
    }
  }

  // Serialize products to plain objects before passing to client component
  const serializedProducts = products.map(serializeProduct)

  return <ShopClient initialProducts={serializedProducts} />
}
