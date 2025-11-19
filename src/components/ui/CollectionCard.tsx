import Link from 'next/link'
import { Collection } from '@/types/collection'

interface CollectionCardProps {
  collection: Collection
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.slug}`} className="group">
      <article className="relative overflow-hidden border border-[#D4CFC3] bg-[#EDE7DE] transition-all duration-300 hover:border-[#C4B9A3] hover:shadow-lg">
        <div className="aspect-[4/5] relative">
          {collection.imageUrl ? (
            <div className="absolute inset-0 bg-gradient-to-br from-[#D8D1C5] via-[#E5E1DA] to-[#F5F2EB]">
              {/* Image would go here */}
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#D8D1C5] via-[#E5E1DA] to-[#F5F2EB] transition-transform duration-500 group-hover:scale-[1.03]"></div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#F5F2EC] via-[#F5F2EC]/90 to-transparent"></div>

          <div className="relative h-full flex flex-col justify-between p-4 sm:p-5">
            <div className="flex justify-between items-start">
              {collection.category && (
                <span className="inline-flex items-center rounded-none bg-[#F5F2EC]/80 text-[0.6rem] sm:text-[0.7rem] tracking-[0.22em] uppercase text-[#7F6C55] px-2.5 py-1 border border-[#D4CBBE]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                  {collection.category}
                </span>
              )}
              {collection.productIds && (
                <span className="text-[0.6rem] tracking-[0.18em] uppercase text-[#7F7A70]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                  {collection.productIds.length} pieces
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[#111111]" style={{ fontFamily: "'Times New Roman', ui-serif, Georgia, 'Times', serif" }}>
                {collection.title}
              </h3>
              {collection.description && (
                <p className="text-sm sm:text-base text-[#5F5A52] leading-relaxed line-clamp-2" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                  {collection.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

