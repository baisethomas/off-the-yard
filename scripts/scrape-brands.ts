import * as cheerio from 'cheerio'
import axios from 'axios'
import * as admin from 'firebase-admin'
import * as path from 'path'
import * as fs from 'fs'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

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
    } else {
      throw new Error('Service account file is empty')
    }
  } catch (error: any) {
    console.warn('Failed to load service account file, using environment variables:', error.message)
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'off-the-yard'
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    
    if (!admin.apps.length) {
      if (clientEmail && privateKey) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
          }),
          projectId,
        })
        console.log('✓ Initialized Firebase Admin with environment variables')
      } else {
        admin.initializeApp({
          projectId,
        })
        console.log('✓ Initialized Firebase Admin with default credentials')
      }
    }
  }
} else {
  console.log('Service account file not found, using environment variables')
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'off-the-yard'
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  
  if (!admin.apps.length) {
    if (clientEmail && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        projectId,
      })
      console.log('✓ Initialized Firebase Admin with environment variables')
    } else {
      admin.initializeApp({
        projectId,
      })
      console.log('✓ Initialized Firebase Admin with default credentials')
    }
  }
}

const db = admin.firestore()

interface BrandData {
  name: string
  bio: string
  logoUrl: string
  heroImageUrl: string
  verified: boolean
}

interface ProductData {
  title: string
  description: string
  imageUrl: string
  externalUrl: string
  category: string
  tags: string[]
}

// Brand configurations
const brands = [
  {
    url: 'https://westwardx.com',
    name: 'WestwardX',
    bio: 'Greek Apparel & Black Culture Streetwear. We strive in making meaningful, quality apparel rooted in the nostalgia of black history.',
    logoSelector: 'img[alt*="WestwardX"], img[alt*="WX"], .logo img, header img',
    platform: 'shopify',
  },
  {
    url: 'https://www.hhnalia.com',
    name: 'HH Nalia',
    bio: 'Omega Psi Phi paraphernalia and apparel. Quality Greek lettered organization merchandise.',
    logoSelector: 'img[alt*="HH Nalia"], img[alt*="HHN"], .logo img, header img',
    platform: 'squarespace',
  },
  {
    url: 'https://thatsowt.com',
    name: "That's OWT",
    bio: 'Unique apparel and accessories with a focus on quality and design.',
    logoSelector: 'img[alt*="OWT"], img[alt*="That\'s OWT"], .logo img, header img',
    platform: 'squarespace',
  },
  // Add more brands here as needed - uncomment and add URLs when ready
  // {
  //   url: 'https://example-brand.com',
  //   name: 'Example Brand',
  //   bio: 'Brand description here.',
  //   logoSelector: 'img[alt*="Brand"], .logo img, header img',
  //   platform: 'shopify', // or 'squarespace'
  // },
]

async function fetchWithRetry(url: string, retries = 3): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        timeout: 30000,
      })
      return response.data
    } catch (error: any) {
      if (i === retries - 1) throw error
      console.log(`    Retry ${i + 1} for ${url}...`)
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }
  throw new Error('Failed to fetch')
}

async function extractLogo($: cheerio.CheerioAPI, baseUrl: string, selectors: string): Promise<string> {
  const selectorsArray = selectors.split(',')
  
  for (const selector of selectorsArray) {
    const img = $(selector.trim()).first()
    if (img.length) {
      let src = img.attr('src') || img.attr('data-src') || img.attr('data-lazy-src')
      if (src) {
        if (src.startsWith('//')) {
          src = 'https:' + src
        } else if (src.startsWith('/')) {
          src = new URL(src, baseUrl).href
        } else if (!src.startsWith('http')) {
          src = new URL(src, baseUrl).href
        }
        return src
      }
    }
  }
  
  // Fallback: try to find any logo-like image
  const logoCandidates = $('img').filter((_, el) => {
    const alt = $(el).attr('alt')?.toLowerCase() || ''
    const src = $(el).attr('src') || ''
    return alt.includes('logo') || src.includes('logo')
  })
  
  if (logoCandidates.length > 0) {
    let src = logoCandidates.first().attr('src') || ''
    if (src.startsWith('//')) {
      src = 'https:' + src
    } else if (src.startsWith('/')) {
      src = new URL(src, baseUrl).href
    }
    return src
  }
  
  return ''
}

async function extractProducts($: cheerio.CheerioAPI, baseUrl: string, brandName: string, platform: string = 'shopify'): Promise<ProductData[]> {
  const products: ProductData[] = []
  
  let productElements: cheerio.Cheerio<cheerio.Element> = $()
  
  if (platform === 'squarespace') {
    // Squarespace selectors
    const squarespaceSelectors = [
      '.ProductItem',
      '.product-item',
      '[data-product-id]',
      '.sqs-product',
      '.product-block',
      '.product-wrapper',
      'article[data-product-id]',
    ]
    
    for (const selector of squarespaceSelectors) {
      const found = $(selector)
      if (found.length > 0) {
        productElements = found
        console.log(`    Found products using Squarespace selector: ${selector}`)
        break
      }
    }
    
    // Squarespace also uses product links
    if (productElements.length === 0) {
      const productLinks = $('a[href*="/p/"], a[href*="/products/"], a[data-product-id]')
      if (productLinks.length > 0) {
        productElements = productLinks.closest('.ProductItem, .product-item, article, .product-block').length > 0 
          ? productLinks.closest('.ProductItem, .product-item, article, .product-block')
          : productLinks.parent()
        console.log(`    Found products via Squarespace product links`)
      }
    }
    
    // Try finding by product grid
    if (productElements.length === 0) {
      const gridItems = $('.ProductList-item, .product-list-item, [class*="ProductList"] [class*="item"]')
      if (gridItems.length > 0) {
        productElements = gridItems
        console.log(`    Found products via Squarespace grid`)
      }
    }
  } else {
    // Shopify product selectors
    const shopifySelectors = [
      '.product-item',
      '.product-card',
      '.product',
      '[data-product-id]',
      '.grid-product',
      '.product-tile',
      '.product-block',
      '[class*="product"]',
    ]
    
    for (const selector of shopifySelectors) {
      const found = $(selector)
      if (found.length > 0) {
        productElements = found
        console.log(`    Found products using Shopify selector: ${selector}`)
        break
      }
    }
    
    if (productElements.length === 0) {
      const productLinks = $('a[href*="/products/"]')
      if (productLinks.length > 0) {
        productElements = productLinks.parent()
        console.log(`    Found products via Shopify product links`)
      }
    }
  }
  
  const seenTitles = new Set<string>()
  const seenUrls = new Set<string>()
  let count = 0
  const maxProducts = 5
  
  productElements.each((_, element) => {
    if (count >= maxProducts) return false
    
    const $el = $(element)
    
    let productUrl = ''
    // Try different link patterns for Shopify and Squarespace
    const linkEl = $el.find('a[href*="/products/"], a[href*="/p/"], a[data-product-id]').first() || 
                   $el.closest('a[href*="/products/"], a[href*="/p/"], a[data-product-id]') ||
                   $el.find('a').first()
    if (linkEl.length) {
      let href = linkEl.attr('href') || ''
      if (href && (href.includes('/products/') || href.includes('/p/') || href.includes('product'))) {
        if (href.startsWith('/')) {
          href = new URL(href, baseUrl).href
        } else if (!href.startsWith('http')) {
          href = new URL(href, baseUrl).href
        }
        productUrl = href
      }
    }
    
    // Fallback: check if element itself is a link
    if (!productUrl && $el.is('a')) {
      let href = $el.attr('href') || ''
      if (href && (href.includes('/products/') || href.includes('/p/') || href.includes('product'))) {
        if (href.startsWith('/')) {
          href = new URL(href, baseUrl).href
        } else if (!href.startsWith('http')) {
          href = new URL(href, baseUrl).href
        }
        productUrl = href
      }
    }
    
    if (productUrl && seenUrls.has(productUrl)) return
    if (productUrl) seenUrls.add(productUrl)
    
    const titleSelectors = [
      '.product-title',
      '.product-name',
      'h2 a',
      'h3 a',
      'h2',
      'h3',
      '[data-product-title]',
      '.card-title',
      'a',
    ]
    
    let title = ''
    for (const selector of titleSelectors) {
      const titleEl = $el.find(selector).first()
      if (titleEl.length) {
        title = titleEl.text().trim()
        if (title && title.length > 3 && title.length < 100) break
      }
    }
    
    if (!title && productUrl) {
      // Handle both Shopify (/products/) and Squarespace (/p/) URLs
      let urlParts = productUrl.split('/products/')
      if (urlParts.length === 1) {
        urlParts = productUrl.split('/p/')
      }
      if (urlParts.length > 1) {
        title = urlParts[1].split('?')[0].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      }
    }
    
    // Try extracting from data attributes (Squarespace)
    if (!title) {
      const dataTitle = $el.attr('data-title') || $el.find('[data-title]').attr('data-title')
      if (dataTitle && dataTitle.length > 3) {
        title = dataTitle.trim()
      }
    }
    
    if (!title || seenTitles.has(title)) return
    seenTitles.add(title)
    
    const imgSelectors = [
      'img[data-product-image]',
      '.product-image img',
      'img[src*="products"]',
      'img',
    ]
    
    let imageUrl = ''
    for (const selector of imgSelectors) {
      const imgEl = $el.find(selector).first()
      if (imgEl.length) {
        let src = imgEl.attr('src') || imgEl.attr('data-src') || imgEl.attr('data-lazy-src') || imgEl.attr('data-original')
        if (src) {
          if (src.startsWith('//')) {
            src = 'https:' + src
          } else if (src.startsWith('/')) {
            src = new URL(src, baseUrl).href
          } else if (!src.startsWith('http')) {
            src = new URL(src, baseUrl).href
          }
          src = src.replace(/_(small|medium|large|grande|1024x1024|2048x2048)\./, '.')
          src = src.replace(/_(\d+x\d+)\./, '_1024x1024.')
          imageUrl = src
          break
        }
      }
    }
    
    if (title && imageUrl && productUrl) {
      products.push({
        title,
        description: `${brandName} - ${title}`,
        imageUrl,
        externalUrl: productUrl,
        category: 'apparel',
        tags: [brandName.toLowerCase().replace(/\s+/g, '-'), 'greek', 'apparel'],
      })
      count++
    }
  })
  
  return products
}

async function scrapeBrand(brandConfig: typeof brands[0]) {
  console.log(`\n🔍 Scraping ${brandConfig.name}...`)
  
  try {
    const html = await fetchWithRetry(brandConfig.url)
    const $ = cheerio.load(html)
    
    const logoUrl = await extractLogo($, brandConfig.url, brandConfig.logoSelector)
    console.log(`  ✓ Logo: ${logoUrl || 'Not found'}`)
    
    const products = await extractProducts($, brandConfig.url, brandConfig.name, brandConfig.platform || 'shopify')
    console.log(`  ✓ Found ${products.length} products`)
    
    const brandRef = db.collection('brands').doc()
    const brandData: BrandData = {
      name: brandConfig.name,
      bio: brandConfig.bio,
      logoUrl: logoUrl || '',
      heroImageUrl: logoUrl || '',
      verified: true,
    }
    
    try {
      await brandRef.set({
        id: brandRef.id,
        ...brandData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      })
      
      console.log(`  ✓ Created brand: ${brandRef.id}`)
      
      for (const product of products) {
        try {
          const productRef = db.collection('products').doc()
          await productRef.set({
            id: productRef.id,
            brandId: brandRef.id,
            ...product,
            approved: true,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          })
          console.log(`    ✓ Created product: ${product.title}`)
        } catch (productError: any) {
          console.error(`    ✗ Failed to create product ${product.title}:`, productError.message)
        }
      }
      
      return { brandId: brandRef.id, productsCount: products.length }
    } catch (dbError: any) {
      console.error(`  ✗ Database error for ${brandConfig.name}:`, dbError.message)
      return { brandId: null, productsCount: products.length, error: dbError.message }
    }
  } catch (error: any) {
    console.error(`  ✗ Error scraping ${brandConfig.name}:`, error.message)
    throw error
  }
}

async function main() {
  console.log('🚀 Starting brand scraping...\n')
  
  const results = []
  
  for (const brand of brands) {
    try {
      const result = await scrapeBrand(brand)
      results.push({ brand: brand.name, ...result })
      await new Promise((resolve) => setTimeout(resolve, 2000))
    } catch (error: any) {
      console.error(`Failed to scrape ${brand.name}:`, error.message)
      results.push({ brand: brand.name, error: error.message })
    }
  }
  
  console.log('\n📊 Summary:')
  console.log('='.repeat(50))
  results.forEach((result) => {
    if (result.error) {
      console.log(`❌ ${result.brand}: ${result.error}`)
    } else {
      console.log(`✅ ${result.brand}: ${result.productsCount} products${result.brandId ? ` (Brand ID: ${result.brandId})` : ''}`)
    }
  })
  
  console.log('\n✨ Scraping complete!')
  process.exit(0)
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
