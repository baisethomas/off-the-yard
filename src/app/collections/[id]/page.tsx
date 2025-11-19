import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ProductCard } from '@/components/ui/ProductCard'
import { getCollectionBySlug } from '@/lib/collections'
import { getApprovedProducts } from '@/lib/products'
import { Collection } from '@/types/collection'

export const revalidate = 60

interface CollectionPageProps {
  params: {
    id: string
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const collection = await getCollectionBySlug(params.id)

  if (!collection) {
    notFound()
  }

  // Fetch products if productIds are specified
  let products: Awaited<ReturnType<typeof getApprovedProducts>> = []
  if (collection.productIds && collection.productIds.length > 0) {
    // For now, fetch all approved products and filter
    // In a real app, you'd fetch specific products by IDs
    const allProducts = await getApprovedProducts(100)
    products = allProducts.filter((p) => collection.productIds?.includes(p.id))
  }

  return (
    <div className="bg-[#F5F2EC] text-[#111111] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12 lg:py-16">
        {/* Header */}
        <section className="space-y-4 sm:space-y-5 mb-10 sm:mb-12">
          <div className="space-y-3">
            {collection.category && (
              <span className="text-xs sm:text-sm tracking-[0.24em] uppercase text-[#A19688]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                {collection.category.toUpperCase()}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#111111]" style={{ fontFamily: "'Times New Roman', ui-serif, Georgia, 'Times', serif" }}>
              {collection.title}
            </h1>
            {collection.description && (
              <p className="text-base sm:text-lg text-[#5F5A52] max-w-2xl leading-relaxed" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                {collection.description}
              </p>
            )}
            {collection.productIds && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#7F7A70]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                <span className="inline-flex h-2 w-2 rounded-full bg-[#7F6C55]"></span>
                <span>{collection.productIds.length} pieces</span>
              </div>
            )}
          </div>
          <div className="h-px bg-[#D4CBBE] w-full"></div>
        </section>

        {/* Products Grid */}
        <section>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <p className="text-base sm:text-lg text-[#5F5A52]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                This collection is being curated. Check back soon.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

