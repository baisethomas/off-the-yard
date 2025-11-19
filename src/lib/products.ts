import { getAdminDb } from './firebaseAdmin'
import { Timestamp } from 'firebase-admin/firestore'

export interface Product {
  id: string
  brandId: string
  title: string
  description: string
  imageUrl: string
  externalUrl: string
  category: string
  tags: string[]
  dropNumber: number | null
  approved: boolean
  createdAt: Timestamp | Date
  updatedAt: Timestamp | Date
}

export interface Brand {
  id: string
  name: string
  bio: string
  logoUrl: string
  heroImageUrl: string
  verified: boolean
  approved?: boolean
  chapter?: string
  ownerUid?: string | null
  socials?: {
    instagram?: string
    website?: string
    [key: string]: any
  }
}

export async function getApprovedProducts(limit: number = 12): Promise<(Product & { brandName?: string })[]> {
  try {
    const adminDb = await getAdminDb()

    if (!adminDb) {
      console.warn('[getApprovedProducts] Firebase Admin not initialized, returning empty products array')
      return []
    }
    
    console.log('[getApprovedProducts] Querying Firestore for approved products...')
    
    // Try to order by createdAt, but if that fails, just get approved products
    let productsSnapshot
    try {
      productsSnapshot = await adminDb
        .collection('products')
        .where('approved', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get()
      console.log(`[getApprovedProducts] Found ${productsSnapshot.size} products (with ordering)`)
    } catch (error: any) {
      console.warn('[getApprovedProducts] Ordering failed, trying without order:', error.message)
      // If ordering fails (e.g., no index), just get approved products
      productsSnapshot = await adminDb
        .collection('products')
        .where('approved', '==', true)
        .limit(limit)
        .get()
      console.log(`[getApprovedProducts] Found ${productsSnapshot.size} products (without ordering)`)
    }

    const products: (Product & { brandName?: string })[] = []
    const brandIds = new Set<string>()

    // Collect brand IDs
    productsSnapshot.forEach((doc) => {
      const data = doc.data()
      if (data.brandId) {
        brandIds.add(data.brandId)
      }
    })

    // Fetch brands in batch
    const brandPromises = Array.from(brandIds).map(async (brandId) => {
      const brandDoc = await adminDb.collection('brands').doc(brandId).get()
      return brandDoc.exists ? { id: brandId, ...brandDoc.data() } as Brand : null
    })

    const brands = (await Promise.all(brandPromises)).filter(Boolean) as Brand[]
    const brandMap = new Map(brands.map((b) => [b.id, b.name]))

    // Map products with brand names
    productsSnapshot.forEach((doc) => {
      const data = doc.data()
      products.push({
        id: doc.id,
        ...data,
        brandName: brandMap.get(data.brandId) || undefined,
      } as Product & { brandName?: string })
    })

    console.log(`[getApprovedProducts] Returning ${products.length} products with brand names`)
    if (products.length > 0) {
      console.log(`[getApprovedProducts] Sample product:`, {
        id: products[0].id,
        title: products[0].title,
        brandName: products[0].brandName,
        approved: products[0].approved
      })
    }

    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getVerifiedBrands(limit: number = 10): Promise<Brand[]> {
  try {
    const adminDb = await getAdminDb()

    if (!adminDb) {
      console.warn('Firebase Admin not initialized, returning empty brands array')
      return []
    }
    
    const brandsSnapshot = await adminDb
      .collection('brands')
      .where('verified', '==', true)
      .limit(limit)
      .get()

    const brands: Brand[] = []
    brandsSnapshot.forEach((doc) => {
      brands.push({
        id: doc.id,
        ...doc.data(),
      } as Brand)
    })

    return brands
  } catch (error) {
    console.error('Error fetching brands:', error)
    return []
  }
}

export async function getBrandById(brandId: string): Promise<Brand | null> {
  try {
    const adminDb = await getAdminDb()
    if (!adminDb) {
      return null
    }

    const brandDoc = await adminDb.collection('brands').doc(brandId).get()
    if (!brandDoc.exists) {
      return null
    }

    return { id: brandDoc.id, ...brandDoc.data() } as Brand
  } catch (error) {
    console.error('Error fetching brand:', error)
    return null
  }
}

export async function getProductsByBrandId(brandId: string, limit: number = 50): Promise<Product[]> {
  try {
    const adminDb = await getAdminDb()
    if (!adminDb) {
      return []
    }

    let productsSnapshot
    try {
      productsSnapshot = await adminDb
        .collection('products')
        .where('brandId', '==', brandId)
        .where('approved', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get()
    } catch (error) {
      productsSnapshot = await adminDb
        .collection('products')
        .where('brandId', '==', brandId)
        .where('approved', '==', true)
        .limit(limit)
        .get()
    }

    const products: Product[] = []
    productsSnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      } as Product)
    })

    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

