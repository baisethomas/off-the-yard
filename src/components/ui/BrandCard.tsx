import Link from 'next/link'
import Image from 'next/image'
import { Brand } from '@/types/brand'

interface BrandCardProps {
  brand: Brand
}

// Normalize Shopify image URLs by replacing {width} placeholder with actual width
function normalizeImageUrl(url: string): string {
  if (url.includes('{width}')) {
    return url.replace(/\{width\}/g, '800')
  }
  return url
}

export function BrandCard({ brand }: BrandCardProps) {
  const normalizedLogoUrl = brand.logoUrl ? normalizeImageUrl(brand.logoUrl) : null

  return (
    <Link href={`/brands/${brand.id}`} className="group">
      <article className="bg-[#EDE7DE] rounded-none overflow-hidden border border-[#D4CFC3] transition-all duration-300 hover:border-[#C4B9A3] hover:shadow-lg">
        <div className="aspect-[4/3] relative bg-gradient-to-br from-[#D4CEC0] via-[#E5E1DA] to-[#F5F2EB] overflow-hidden">
          {normalizedLogoUrl ? (
            <Image
              src={normalizedLogoUrl}
              alt={brand.name}
              fill
              className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-lg font-medium text-[#7F786A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                {brand.name}
              </span>
            </div>
          )}
        </div>
        <div className="p-4 sm:p-5 space-y-2">
          <h3 className="text-base sm:text-lg font-medium tracking-tight uppercase text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            {brand.name}
          </h3>
          {brand.bio && (
            <p className="text-xs sm:text-sm text-[#4C4A45] line-clamp-2" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
              {brand.bio}
            </p>
          )}
          {brand.chapter && (
            <p className="text-[0.65rem] tracking-[0.22em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              {brand.chapter}
            </p>
          )}
        </div>
      </article>
    </Link>
  )
}

