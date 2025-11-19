import { notFound } from 'next/navigation'
import { getCollectionBySlug } from '@/lib/collections'

export const revalidate = 60

export default async function CollectionPage({ params }: { params: { id: string } }) {
  // Treat id as slug since getCollectionBySlug uses slug
  const collection = await getCollectionBySlug(params.id)

  if (!collection) {
    notFound()
  }

  return (
    <div className="bg-[#E5E1DA] text-[#1A1A1A] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <section className="mb-10 sm:mb-12 space-y-6">
          {collection.heroImageUrl && (
            <div className="aspect-[21/9] bg-gradient-to-br from-[#D4CEC0] via-[#E5E1DA] to-[#F5F2EB] overflow-hidden border border-[#D4CFC3]">
              <img 
                src={collection.heroImageUrl} 
                alt={collection.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              Collection
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              {collection.title}
            </h1>
            {collection.description && (
              <p className="text-base sm:text-lg leading-relaxed text-[#4C4A45] max-w-3xl" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                {collection.description}
              </p>
            )}
          </div>

          <div className="h-px w-full bg-[#D4CFC3]"></div>
        </section>

        {/* Products Section - Placeholder */}
        <section className="pb-12 sm:pb-16 lg:pb-20">
          <p className="text-base text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
            Collection products coming soon.
          </p>
        </section>
      </div>
    </div>
  )
}

