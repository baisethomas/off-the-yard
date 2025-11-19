import { redirect } from 'next/navigation'
import Link from 'next/link'
import { requireAuth } from '@/lib/auth/serverAuth'
import { getAdminDb } from '@/lib/firebaseAdmin'
import { Brand } from '@/types/brand'
import { Product } from '@/types/product'

export default async function DashboardPage() {
  let user
  try {
    user = await requireAuth('seller')
  } catch {
    redirect('/auth')
  }

  // Fetch user's brands and products
  let brands: Brand[] = []
  let products: Product[] = []

  try {
    const adminDb = await getAdminDb()
    if (adminDb) {
      // Fetch brands owned by user
      const brandsSnapshot = await adminDb
        .collection('brands')
        .where('ownerUid', '==', user.uid)
        .get()

      brands = brandsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Brand[]

      // Fetch products from user's brands
      // Note: Firestore 'in' queries are limited to 10 items
      if (brands.length > 0) {
        const brandIds = brands.map((b) => b.id)
        // Split into chunks of 10 for Firestore 'in' query limit
        const chunks: string[][] = []
        for (let i = 0; i < brandIds.length; i += 10) {
          chunks.push(brandIds.slice(i, i + 10))
        }
        
        // Fetch products for each chunk
        const productPromises = chunks.map((chunk) =>
          adminDb.collection('products').where('brandId', 'in', chunk).get()
        )
        const productSnapshots = await Promise.all(productPromises)
        
        // Combine results
        const allProductDocs = productSnapshots.reduce((acc, snap) => {
          snap.docs.forEach((doc) => acc.push(doc))
          return acc
        }, [] as any[])

        products = allProductDocs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[]
      }
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  }

  return (
    <div className="bg-[#E5E1DA] text-[#1A1A1A] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12 lg:py-16">
        {/* Header */}
        <section className="mb-10 sm:mb-12 space-y-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1A1A] mb-2" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              Seller Dashboard
            </h1>
            <p className="text-base sm:text-lg text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
              Manage your brands and products
            </p>
          </div>
          <div className="h-px w-full bg-[#D4CFC3]"></div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 sm:mb-12">
          <div className="bg-[#EDE7DE] border border-[#D4CFC3] p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-medium tracking-tight text-[#1A1A1A] mb-2" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              My Brands
            </h2>
            <p className="text-4xl sm:text-5xl font-medium text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              {brands.length}
            </p>
          </div>
          <div className="bg-[#EDE7DE] border border-[#D4CFC3] p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-medium tracking-tight text-[#1A1A1A] mb-2" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              My Products
            </h2>
            <p className="text-4xl sm:text-5xl font-medium text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              {products.length}
            </p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-[#1A1A1A] mb-6" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/api/brands/create"
              className="inline-flex items-center justify-center rounded-none border border-[#1A1A1A] bg-[#1A1A1A] text-[#F5F2EB] text-sm font-normal tracking-[0.22em] uppercase py-2.5 px-6 hover:bg-transparent hover:text-[#1A1A1A] transition-colors"
              style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
            >
              Create Brand
            </Link>
            <Link
              href="/api/products/create"
              className="inline-flex items-center justify-center rounded-none border border-[#1A1A1A] bg-transparent text-[#1A1A1A] text-sm font-normal tracking-[0.22em] uppercase py-2.5 px-6 hover:bg-[#1A1A1A] hover:text-[#F5F2EB] transition-colors"
              style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
            >
              Add Product
            </Link>
          </div>
        </section>

        {/* My Brands */}
        <section className="mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-[#1A1A1A] mb-6" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            My Brands
          </h2>
          {brands.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands.map((brand) => (
                <Link key={brand.id} href={`/brands/${brand.id}`} className="bg-[#EDE7DE] border border-[#D4CFC3] p-6 hover:border-[#C4B9A3] transition-colors">
                  <h3 className="text-lg font-medium tracking-tight text-[#1A1A1A] mb-2" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                    {brand.name}
                  </h3>
                  {brand.bio && (
                    <p className="text-sm text-[#4C4A45] line-clamp-2" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                      {brand.bio}
                    </p>
                  )}
                  <span className="inline-block mt-4 text-xs tracking-[0.22em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                    View Brand →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-[#EDE7DE] border border-[#D4CFC3] p-8 text-center">
              <p className="text-base text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                No brands yet. Create your first brand to get started.
              </p>
            </div>
          )}
        </section>

        {/* My Products */}
        <section>
          <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-[#1A1A1A] mb-6" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            My Products
          </h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-[#EDE7DE] border border-[#D4CFC3] p-6">
                  <h3 className="text-base font-medium tracking-tight text-[#1A1A1A] mb-2" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                    {product.title}
                  </h3>
                  {product.description && (
                    <p className="text-sm text-[#4C4A45] line-clamp-2 mb-4" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                      {product.description}
                    </p>
                  )}
                  <a
                    href={product.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-[0.22em] uppercase text-[#7F786A] hover:text-[#1A1A1A] transition-colors"
                    style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                  >
                    View Product →
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#EDE7DE] border border-[#D4CFC3] p-8 text-center">
              <p className="text-base text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                No products yet. Add your first product to get started.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
