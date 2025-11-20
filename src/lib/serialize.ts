import { Product, Brand } from './products'

/**
 * Serialize Firestore data to plain objects for Client Components
 * This ensures all data is JSON-serializable and safe to pass to Client Components
 */
export function serializeProduct(product: Product & { brandName?: string }): any {
  const serialized: Record<string, any> = {}
  
  // Always include required fields
  serialized.id = String(product.id || '')
  serialized.title = String(product.title || '')
  serialized.imageUrl = String(product.imageUrl || '')
  serialized.externalUrl = String(product.externalUrl || '')
  serialized.brandId = String(product.brandId || '')

  // Optional fields
  if (product.brandName) serialized.brandName = String(product.brandName)
  if (product.description) serialized.description = String(product.description)
  if (product.category) serialized.category = String(product.category)
  if (product.dropNumber !== null && product.dropNumber !== undefined) {
    serialized.dropNumber = typeof product.dropNumber === 'number' ? product.dropNumber : Number(product.dropNumber)
  }
  if (product.approved !== undefined) serialized.approved = Boolean(product.approved)
  
  // Handle tags array - ensure it's a plain array
  if (Array.isArray(product.tags)) {
    serialized.tags = product.tags.map((tag: any) => String(tag))
  }

  // Convert Firestore Timestamps to ISO strings
  if (product.createdAt) {
    try {
      const createdAt = product.createdAt as any
      if (createdAt && typeof createdAt === 'object' && 'toDate' in createdAt && typeof createdAt.toDate === 'function') {
        serialized.createdAt = createdAt.toDate().toISOString()
      } else if (createdAt instanceof Date) {
        serialized.createdAt = createdAt.toISOString()
      } else if (typeof createdAt === 'string') {
        serialized.createdAt = createdAt
      }
    } catch (e) {
      // Ignore timestamp conversion errors
    }
  }

  if (product.updatedAt) {
    try {
      const updatedAt = product.updatedAt as any
      if (updatedAt && typeof updatedAt === 'object' && 'toDate' in updatedAt && typeof updatedAt.toDate === 'function') {
        serialized.updatedAt = updatedAt.toDate().toISOString()
      } else if (updatedAt instanceof Date) {
        serialized.updatedAt = updatedAt.toISOString()
      } else if (typeof updatedAt === 'string') {
        serialized.updatedAt = updatedAt
      }
    } catch (e) {
      // Ignore timestamp conversion errors
    }
  }

  return serialized
}

export function serializeBrand(brand: Brand & { createdAt?: any; updatedAt?: any }): any {
  const serialized: Record<string, any> = {}
  
  // Always include required fields
  serialized.id = String(brand.id || '')
  serialized.name = String(brand.name || '')
  serialized.bio = String(brand.bio || '')
  serialized.logoUrl = String(brand.logoUrl || '')
  serialized.heroImageUrl = String(brand.heroImageUrl || '')
  serialized.verified = Boolean(brand.verified)

  // Optional fields
  if (brand.chapter) serialized.chapter = String(brand.chapter)
  if (brand.ownerUid) serialized.ownerUid = String(brand.ownerUid)
  if (brand.approved !== undefined) serialized.approved = Boolean(brand.approved)
  
  // Ensure socials is a plain object
  if (brand.socials) {
    if (typeof brand.socials === 'object' && brand.socials !== null) {
      serialized.socials = JSON.parse(JSON.stringify(brand.socials))
    } else {
      serialized.socials = brand.socials
    }
  }

  // Convert Firestore Timestamps to ISO strings if they exist
  if (brand.createdAt) {
    try {
      const createdAt = brand.createdAt as any
      if (createdAt && typeof createdAt === 'object' && 'toDate' in createdAt && typeof createdAt.toDate === 'function') {
        serialized.createdAt = createdAt.toDate().toISOString()
      } else if (createdAt instanceof Date) {
        serialized.createdAt = createdAt.toISOString()
      } else if (typeof createdAt === 'string') {
        serialized.createdAt = createdAt
      }
    } catch (e) {
      // Ignore timestamp conversion errors
    }
  }

  if (brand.updatedAt) {
    try {
      const updatedAt = brand.updatedAt as any
      if (updatedAt && typeof updatedAt === 'object' && 'toDate' in updatedAt && typeof updatedAt.toDate === 'function') {
        serialized.updatedAt = updatedAt.toDate().toISOString()
      } else if (updatedAt instanceof Date) {
        serialized.updatedAt = updatedAt.toISOString()
      } else if (typeof updatedAt === 'string') {
        serialized.updatedAt = updatedAt
      }
    } catch (e) {
      // Ignore timestamp conversion errors
    }
  }

  return serialized
}

