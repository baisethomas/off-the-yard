import Link from 'next/link'
import { getVerifiedBrands } from '@/lib/products'

export const revalidate = 60

export default async function BrandsPage() {
  // Fetch all verified brands
  let brands = await getVerifiedBrands(50) // Get up to 50 brands

  return (
    <div className="bg-[#E5E1DA] text-[#1A1A1A] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12 lg:py-16">
        {/* Header */}
        <section className="mb-10 sm:mb-12 lg:mb-14">
          <div className="space-y-4">
            <span className="inline-flex items-center text-[0.7rem] sm:text-xs tracking-[0.26em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              Brands Directory
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              Que-owned streetwear brands
            </h1>
            <p className="text-base sm:text-lg text-[#4C4A45] max-w-2xl" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
              Discover the brands behind the yard uniforms. Each brand is Que-owned and verified.
            </p>
          </div>
        </section>

        {/* Brands Grid */}
        <section>
          {brands.length > 0 ? (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/brands/${brand.id}`}
                  className="group bg-[#EDE7DE] border border-[#D4CFC3] transition-colors duration-300 hover:border-[#1A1A1A]"
                >
                  <div className="aspect-square sm:aspect-[4/3] bg-gradient-to-br from-[#D4CEC0] via-[#E5E1DA] to-[#F5F2EB] relative overflow-hidden border-b border-[#D4CFC3]">
                    {brand.logoUrl ? (
                      <img
                        src={brand.logoUrl}
                        alt={`${brand.name} logo`}
                        className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <span className="text-2xl font-medium text-[#7F786A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                          {brand.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6 space-y-2">
                    <h2 className="text-lg sm:text-xl font-medium tracking-tight text-[#1A1A1A] group-hover:text-[#4C4A45] transition-colors" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                      {brand.name}
                    </h2>
                    {brand.bio && (
                      <p className="text-sm text-[#4C4A45] line-clamp-2" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                        {brand.bio}
                      </p>
                    )}
                    {brand.chapter && (
                      <p className="text-xs text-[#7F786A] uppercase tracking-[0.22em] pt-1" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                        {brand.chapter}
                      </p>
                    )}
                    <div className="pt-2">
                      <span className="text-xs text-[#7F786A] uppercase tracking-[0.26em] group-hover:text-[#1A1A1A] transition-colors inline-flex items-center gap-2" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                        View brand
                        <span className="text-[0.65rem]">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <p className="text-base sm:text-lg text-[#4C4A45] mb-4" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                No brands available yet.
              </p>
              <p className="text-sm text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                Brands will appear here once they&apos;re verified.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
