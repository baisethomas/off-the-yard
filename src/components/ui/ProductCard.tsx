import { Product } from '@/lib/products'

// Flexible product type for display - only requires fields actually used by ProductCard
type ProductDisplay = Pick<Product, 'id' | 'title' | 'imageUrl' | 'externalUrl'> & {
  brandName?: string
  dropNumber?: number | null
}

interface ProductCardProps {
  product: ProductDisplay | Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group bg-[#EDE7DE] rounded-none overflow-hidden border border-[#D4CFC3] transition-colors duration-300">
      <div className="relative overflow-hidden rounded-b-none">
        <a 
          href={product.externalUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block aspect-[3/4] bg-gradient-to-b from-[#D4CEC0] via-[#E5E1DA] to-[#F5F2EB]"
        >
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.title}
              className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="h-full w-full transform transition-transform duration-300 group-hover:scale-[1.02] flex items-end justify-between p-4">
              <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A] bg-[#E5E1DA]/80 rounded-none py-1 px-2.5" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                {product.dropNumber ? `Capsule ${product.dropNumber}` : 'New'}
              </span>
            </div>
          )}
        </a>
      </div>
      <div className="p-4 sm:p-5 space-y-2">
        <h3 className="text-sm sm:text-base font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
          {product.title}
        </h3>
        {'brandName' in product && product.brandName && (
          <p className="text-sm text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
            {product.brandName}
          </p>
        )}
        <div className="flex items-center justify-between text-[0.7rem] text-[#7F786A] pt-3">
          {product.dropNumber && (
            <span className="tracking-[0.26em] uppercase" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              Capsule {product.dropNumber}
            </span>
          )}
          <a 
            href={product.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-[0.65rem] tracking-[0.26em] uppercase text-[#7F786A] group-hover:text-[#1A1A1A] transition-colors"
            style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
          >
            Link out
          </a>
        </div>
      </div>
    </article>
  )
}

