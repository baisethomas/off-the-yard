import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: string
  title: string
  description?: string
  imageUrl: string
  externalUrl: string
  brandId?: string
  brandName?: string
  tags?: string[]
  dropNumber?: number | null
}

interface ProductCardProps {
  product: Product
}

// Normalize Shopify image URLs by replacing {width} placeholder with actual width
function normalizeImageUrl(url: string): string {
  if (url.includes('{width}')) {
    // Replace {width} with 2048 for high-quality images
    return url.replace(/\{width\}/g, '2048')
  }
  return url
}

export function ProductCard({ product }: ProductCardProps) {
  const normalizedImageUrl = product.imageUrl ? normalizeImageUrl(product.imageUrl) : null

  return (
    <article className="group bg-[#EDE7DE] rounded-none overflow-hidden border border-[#D4CFC3] transition-colors duration-300">
      <div className="relative overflow-hidden rounded-b-none">
        <Link href={product.externalUrl} target="_blank" rel="noopener noreferrer">
          <div className="aspect-[3/4] relative bg-gradient-to-b from-[#D4CEC0] via-[#E5E1DA] to-[#F5F2EB]">
            {normalizedImageUrl ? (
              <Image
                src={normalizedImageUrl}
                alt={product.title}
                fill
                className="object-cover transform transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              <div className="h-full w-full transform transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="h-full w-full flex items-end justify-between p-4">
                  <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A] bg-[#E5E1DA]/80 rounded-none py-1 px-2.5" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                    New
                  </span>
                </div>
              </div>
            )}
          </div>
        </Link>
      </div>
      <div className="p-4 sm:p-5 space-y-2">
        <h3 className="text-sm sm:text-base font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
          {product.title}
        </h3>
        {product.brandName && (
          <p className="text-sm text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
            {product.brandName}
          </p>
        )}
        <div className="flex items-center justify-between text-[0.7rem] text-[#7F786A] pt-3">
          {product.dropNumber && (
            <span className="tracking-[0.26em] uppercase" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              Capsule {product.dropNumber.toString().padStart(3, '0')}
            </span>
          )}
          <Link
            href={product.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-[0.65rem] tracking-[0.26em] uppercase text-[#7F786A] group-hover:text-[#1A1A1A] transition-colors"
            style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
          >
            Link out
          </Link>
        </div>
      </div>
    </article>
  )
}

