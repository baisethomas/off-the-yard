import Link from 'next/link'
import Image from 'next/image'
import { BrandCard } from '@/components/ui/BrandCard'
import { getVerifiedBrands } from '@/lib/products'
import { Brand } from '@/types/brand'

// Normalize Shopify image URLs by replacing {width} placeholder with actual width
function normalizeImageUrl(url: string): string {
  if (url.includes('{width}')) {
    return url.replace(/\{width\}/g, '2048')
  }
  return url
}

// Enable ISR with 60 second revalidation
export const revalidate = 60

export default async function BrandsPage() {
  let brands: Brand[] = []

  // Only fetch data in production or if explicitly needed
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_DATA_FETCH === 'true') {
    try {
      const timeoutMs = 5000
      const timeoutPromise = (label: string) =>
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`${label} timeout after ${timeoutMs}ms`)), timeoutMs)
        )

      const brandsResult = await Promise.race([
        getVerifiedBrands(100),
        timeoutPromise('Brands')
      ])

      brands = brandsResult
    } catch (error) {
      console.warn('Error fetching brands:', error)
    }
  }

  return (
    <div className="bg-[#E5E1DA] text-[#1A1A1A] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12 lg:py-16">
        {/* Header Section */}
        <section className="space-y-4 sm:space-y-5 mb-10 sm:mb-12 lg:mb-14">
          <div className="space-y-3">
            <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              QUE-OWNED BRANDS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              Brands
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#4C4A45] max-w-2xl" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
              Discover Que-owned streetwear brands building quiet, considered pieces for the yard. Each brand links out to their own storefront—support the Bruhz directly.
            </p>
          </div>
          <div className="h-px w-full bg-[#D4CFC3]"></div>
        </section>

        {/* Brands Grid */}
        <section>
          {brands.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {brands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Placeholder cards */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-[#EDE7DE] rounded-none overflow-hidden border border-[#D4CFC3]">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#D4CEC0] via-[#E5E1DA] to-[#F5F2EB]"></div>
                  <div className="p-4 sm:p-5 space-y-2">
                    <h3 className="text-base sm:text-lg font-medium tracking-tight uppercase text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                      Coming Soon
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                      More brands coming soon
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
