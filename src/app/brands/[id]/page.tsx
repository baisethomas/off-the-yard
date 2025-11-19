import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBrandById, getProductsByBrandId } from '@/lib/products'
import { ProductCard } from '@/components/ui/ProductCard'

export const revalidate = 60

export default async function BrandPage({ params }: { params: { id: string } }) {
  const brand = await getBrandById(params.id)

  if (!brand || (brand.approved !== undefined && !brand.approved)) {
    notFound()
  }

  const products = await getProductsByBrandId(params.id)

  return (
    <div className="bg-[#E5E1DA] text-[#1A1A1A] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Hero Section */}
        <section className="pt-10 sm:pt-14 lg:pt-16 pb-10 sm:pb-12">
          <div className="space-y-6">
            {brand.heroImageUrl && (
              <div className="aspect-[21/9] bg-gradient-to-br from-[#D4CEC0] via-[#E5E1DA] to-[#F5F2EB] overflow-hidden border border-[#D4CFC3]">
                <img 
                  src={brand.heroImageUrl} 
                  alt={brand.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              {brand.logoUrl && (
                <div className="w-24 h-24 sm:w-32 sm:h-32 border border-[#D4CFC3] bg-[#EDE7DE] flex items-center justify-center">
                  <img 
                    src={brand.logoUrl} 
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              )}
              
              <div className="flex-1 space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                  {brand.name}
                </h1>
                {brand.chapter && (
                  <p className="text-sm sm:text-base text-[#7F786A] uppercase tracking-[0.22em]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                    {brand.chapter}
                  </p>
                )}
              </div>
            </div>

            {brand.bio && (
              <p className="text-base sm:text-lg leading-relaxed text-[#4C4A45] max-w-3xl" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                {brand.bio}
              </p>
            )}

            {brand.socials && Object.keys(brand.socials).length > 0 && (
              <div className="flex gap-4 pt-2">
                {brand.socials.instagram && (
                  <a 
                    href={brand.socials.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-[#7F786A] hover:text-[#1A1A1A] transition-colors"
                    style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                  >
                    Instagram
                  </a>
                )}
                {brand.socials.website && (
                  <a 
                    href={brand.socials.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-[#7F786A] hover:text-[#1A1A1A] transition-colors"
                    style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                  >
                    Website
                  </a>
                )}
              </div>
            )}

            <div className="h-px w-full bg-[#D4CFC3]"></div>
          </div>
        </section>

        {/* Products Section */}
        <section className="pb-12 sm:pb-16 lg:pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              Products
            </h2>
          </div>

          {products.length > 0 ? (
            <div className="grid gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-base text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
              No products available yet.
            </p>
          )}
        </section>
      </div>
    </div>
  )
}

