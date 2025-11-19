import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ProductCard } from '@/components/ui/ProductCard'
import { getBrandById, getProductsByBrandId } from '@/lib/products'
import { Brand } from '@/types/brand'
import { Product } from '@/types/product'

// Normalize Shopify image URLs
function normalizeImageUrl(url: string): string {
  if (url.includes('{width}')) {
    return url.replace(/\{width\}/g, '2048')
  }
  return url
}

export const revalidate = 60

interface BrandPageProps {
  params: {
    id: string
  }
}

export default async function BrandPage({ params }: BrandPageProps) {
  const brand = await getBrandById(params.id)
  const products = brand ? await getProductsByBrandId(params.id) : []

  if (!brand) {
    notFound()
  }

  const normalizedHeroUrl = brand.heroImageUrl ? normalizeImageUrl(brand.heroImageUrl) : null
  const normalizedLogoUrl = brand.logoUrl ? normalizeImageUrl(brand.logoUrl) : null

  return (
    <div className="bg-[#E5E1DA] text-[#1A1A1A] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Hero Section */}
        <section className="pt-10 sm:pt-12 lg:pt-16 pb-8 sm:pb-10">
          {normalizedHeroUrl ? (
            <div className="relative aspect-[21/9] w-full overflow-hidden border border-[#D4CFC3] mb-6 sm:mb-8">
              <Image
                src={normalizedHeroUrl}
                alt={brand.name}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          ) : (
            <div className="aspect-[21/9] w-full bg-gradient-to-br from-[#D4CEC0] via-[#E5E1DA] to-[#F5F2EB] border border-[#D4CFC3] mb-6 sm:mb-8"></div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8">
            {/* Logo */}
            {normalizedLogoUrl && (
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 border border-[#D4CFC3] bg-[#EDE7DE] p-4">
                <Image
                  src={normalizedLogoUrl}
                  alt={brand.name}
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </div>
            )}

            {/* Brand Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1A1A] mb-2" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                  {brand.name}
                </h1>
                {brand.chapter && (
                  <p className="text-sm sm:text-base tracking-[0.22em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                    {brand.chapter}
                  </p>
                )}
              </div>

              {brand.bio && (
                <p className="text-base sm:text-lg leading-relaxed text-[#4C4A45] max-w-2xl" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                  {brand.bio}
                </p>
              )}

              {/* Social Links */}
              {brand.socials && (brand.socials.instagram || brand.socials.website || brand.socials.x) && (
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {brand.socials.website && (
                    <a
                      href={brand.socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm tracking-[0.22em] uppercase text-[#4C4A45] hover:text-[#1A1A1A] transition-colors border-b border-transparent hover:border-[#1A1A1A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                    >
                      Website
                    </a>
                  )}
                  {brand.socials.instagram && (
                    <a
                      href={`https://instagram.com/${brand.socials.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm tracking-[0.22em] uppercase text-[#4C4A45] hover:text-[#1A1A1A] transition-colors border-b border-transparent hover:border-[#1A1A1A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                    >
                      Instagram
                    </a>
                  )}
                  {brand.socials.x && (
                    <a
                      href={`https://x.com/${brand.socials.x.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm tracking-[0.22em] uppercase text-[#4C4A45] hover:text-[#1A1A1A] transition-colors border-b border-transparent hover:border-[#1A1A1A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                    >
                      X
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="border-t border-[#D4CFC3] pt-10 sm:pt-12 pb-12 sm:pb-16">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              Products
            </h2>
            <span className="text-sm text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              {products.length} {products.length === 1 ? 'piece' : 'pieces'}
            </span>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
              {products.map((product) => (
                <ProductCard key={product.id} product={{ ...product, brandName: brand.name }} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <p className="text-base sm:text-lg text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                No products available yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

