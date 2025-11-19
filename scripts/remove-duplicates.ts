import * as admin from 'firebase-admin'
import * as path from 'path'
import * as fs from 'fs'
import { fileURLToPath } from 'url'

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Firebase Admin
const serviceAccountPath = path.join(__dirname, '..', 'off-the-yard-firebase-adminsdk-fbsvc-d7fadb40f7.json')

if (fs.existsSync(serviceAccountPath)) {
  try {
    const fileContent = fs.readFileSync(serviceAccountPath, 'utf8')
    if (fileContent.trim()) {
      const serviceAccount = JSON.parse(fileContent)
      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        })
        console.log('✓ Initialized Firebase Admin with service account file')
      }
    }
  } catch (error: any) {
    console.warn('Failed to load service account file:', error.message)
    if (!admin.apps.length) {
      admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || 'off-the-yard',
      })
    }
  }
} else {
  if (!admin.apps.length) {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'off-the-yard',
    })
  }
}

const db = admin.firestore()

async function removeDuplicateProducts() {
  console.log('\n🔍 Checking for duplicate products...\n')
  
  try {
    // Get all products
    const productsSnapshot = await db.collection('products').get()
    const products: Array<{ id: string; data: any }> = []
    
    productsSnapshot.forEach((doc) => {
      products.push({ id: doc.id, data: doc.data() })
    })
    
    console.log(`Found ${products.length} total products`)
    
    // Group by brandId + externalUrl (most reliable way to identify duplicates)
    const productMap = new Map<string, Array<{ id: string; createdAt: any }>>()
    
    products.forEach((product) => {
      const key = `${product.data.brandId || 'no-brand'}_${product.data.externalUrl || 'no-url'}`
      if (!productMap.has(key)) {
        productMap.set(key, [])
      }
      productMap.get(key)!.push({
        id: product.id,
        createdAt: product.data.createdAt,
      })
    })
    
    // Find duplicates (groups with more than 1 product)
    const duplicates: Array<{ key: string; products: Array<{ id: string; createdAt: any }> }> = []
    productMap.forEach((productList, key) => {
      if (productList.length > 1) {
        duplicates.push({ key, products: productList })
      }
    })
    
    console.log(`Found ${duplicates.length} sets of duplicate products\n`)
    
    if (duplicates.length === 0) {
      console.log('✅ No duplicates found!')
      return { removed: 0, kept: products.length }
    }
    
    let removedCount = 0
    let keptCount = 0
    
    // For each duplicate set, keep the oldest one (first created) and delete the rest
    for (const duplicate of duplicates) {
      // Sort by createdAt (oldest first)
      const sorted = duplicate.products.sort((a, b) => {
        const aTime = a.createdAt?.toMillis?.() || a.createdAt?.getTime?.() || 0
        const bTime = b.createdAt?.toMillis?.() || b.createdAt?.getTime?.() || 0
        return aTime - bTime
      })
      
      // Keep the first (oldest), delete the rest
      const toKeep = sorted[0]
      const toDelete = sorted.slice(1)
      
      console.log(`  Duplicate set (${duplicate.products.length} products):`)
      console.log(`    ✓ Keeping: ${toKeep.id} (oldest)`)
      
      for (const product of toDelete) {
        try {
          await db.collection('products').doc(product.id).delete()
          console.log(`    ✗ Deleted: ${product.id}`)
          removedCount++
        } catch (error: any) {
          console.error(`    ✗ Failed to delete ${product.id}:`, error.message)
        }
      }
      
      keptCount++
    }
    
    console.log(`\n✅ Removed ${removedCount} duplicate products`)
    console.log(`✅ Kept ${keptCount} original products (plus ${products.length - removedCount - keptCount} non-duplicates)`)
    
    return { removed: removedCount, kept: products.length - removedCount }
  } catch (error: any) {
    console.error('Error removing duplicate products:', error.message)
    throw error
  }
}

async function removeDuplicateBrands() {
  console.log('\n🔍 Checking for duplicate brands...\n')
  
  try {
    // Get all brands
    const brandsSnapshot = await db.collection('brands').get()
    const brands: Array<{ id: string; data: any }> = []
    
    brandsSnapshot.forEach((doc) => {
      brands.push({ id: doc.id, data: doc.data() })
    })
    
    console.log(`Found ${brands.length} total brands`)
    
    // Group by name (case-insensitive)
    const brandMap = new Map<string, Array<{ id: string; createdAt: any; name: string }>>()
    
    brands.forEach((brand) => {
      const key = (brand.data.name || '').toLowerCase().trim()
      if (!key) return // Skip brands without names
      
      if (!brandMap.has(key)) {
        brandMap.set(key, [])
      }
      brandMap.get(key)!.push({
        id: brand.id,
        createdAt: brand.data.createdAt,
        name: brand.data.name,
      })
    })
    
    // Find duplicates (groups with more than 1 brand)
    const duplicates: Array<{ key: string; brands: Array<{ id: string; createdAt: any; name: string }> }> = []
    brandMap.forEach((brandList, key) => {
      if (brandList.length > 1) {
        duplicates.push({ key, brands: brandList })
      }
    })
    
    console.log(`Found ${duplicates.length} sets of duplicate brands\n`)
    
    if (duplicates.length === 0) {
      console.log('✅ No duplicates found!')
      return { removed: 0, kept: brands.length }
    }
    
    let removedCount = 0
    let keptCount = 0
    
    // For each duplicate set, keep the oldest one and delete the rest
    for (const duplicate of duplicates) {
      // Sort by createdAt (oldest first)
      const sorted = duplicate.brands.sort((a, b) => {
        const aTime = a.createdAt?.toMillis?.() || a.createdAt?.getTime?.() || 0
        const bTime = b.createdAt?.toMillis?.() || b.createdAt?.getTime?.() || 0
        return aTime - bTime
      })
      
      // Keep the first (oldest), delete the rest
      const toKeep = sorted[0]
      const toDelete = sorted.slice(1)
      
      console.log(`  Duplicate brand: "${duplicate.key}" (${duplicate.brands.length} instances)`)
      console.log(`    ✓ Keeping: ${toKeep.id} - "${toKeep.name}" (oldest)`)
      
      // Before deleting, we need to update products that reference the deleted brands
      for (const brand of toDelete) {
        try {
          // Find products referencing this brand
          const productsSnapshot = await db
            .collection('products')
            .where('brandId', '==', brand.id)
            .get()
          
          // Update products to reference the kept brand instead
          const updatePromises = productsSnapshot.docs.map(async (productDoc) => {
            await productDoc.ref.update({ brandId: toKeep.id })
          })
          await Promise.all(updatePromises)
          
          if (productsSnapshot.size > 0) {
            console.log(`    ↻ Updated ${productsSnapshot.size} products to reference kept brand`)
          }
          
          // Now delete the duplicate brand
          await db.collection('brands').doc(brand.id).delete()
          console.log(`    ✗ Deleted: ${brand.id} - "${brand.name}"`)
          removedCount++
        } catch (error: any) {
          console.error(`    ✗ Failed to delete ${brand.id}:`, error.message)
        }
      }
      
      keptCount++
    }
    
    console.log(`\n✅ Removed ${removedCount} duplicate brands`)
    console.log(`✅ Kept ${keptCount} original brands (plus ${brands.length - removedCount - keptCount} non-duplicates)`)
    
    return { removed: removedCount, kept: brands.length - removedCount }
  } catch (error: any) {
    console.error('Error removing duplicate brands:', error.message)
    throw error
  }
}

async function main() {
  console.log('🚀 Starting duplicate removal...\n')
  
  try {
    // Remove duplicate products first
    const productsResult = await removeDuplicateProducts()
    
    // Then remove duplicate brands (and update product references)
    const brandsResult = await removeDuplicateBrands()
    
    console.log('\n📊 Summary:')
    console.log('='.repeat(50))
    console.log(`Products: Removed ${productsResult.removed} duplicates, kept ${productsResult.kept}`)
    console.log(`Brands: Removed ${brandsResult.removed} duplicates, kept ${brandsResult.kept}`)
    console.log('\n✨ Duplicate removal complete!')
    
    process.exit(0)
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})

