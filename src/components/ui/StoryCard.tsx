import Link from 'next/link'
import Image from 'next/image'
import { Story } from '@/types/story'

interface StoryCardProps {
  story: Story
  variant?: 'default' | 'featured' | 'mini'
}

// Normalize Shopify image URLs by replacing {width} placeholder with actual width
function normalizeImageUrl(url: string): string {
  if (url.includes('{width}')) {
    return url.replace(/\{width\}/g, '1200')
  }
  return url
}

export function StoryCard({ story, variant = 'default' }: StoryCardProps) {
  const normalizedHeroUrl = story.heroImageUrl ? normalizeImageUrl(story.heroImageUrl) : null

  if (variant === 'mini') {
    return (
      <article className="border-b border-[#D4CFC3] pb-4 last:border-b-0 last:pb-0">
        <Link href={`/stories/${story.slug}`}>
          <span className="text-[0.65rem] tracking-[0.22em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
            {story.category}
          </span>
          <h4 className="mt-1 text-sm sm:text-base font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
            {story.title}
          </h4>
          {story.publishedAt && (
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[0.65rem] tracking-[0.18em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                {new Date(story.publishedAt as Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
              </span>
              <span className="text-[0.65rem] tracking-[0.26em] uppercase text-[#1A1A1A] hover:text-[#3D3D3D] transition-colors text-right" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                READ →
              </span>
            </div>
          )}
        </Link>
      </article>
    )
  }

  if (variant === 'featured') {
    return (
      <article className="relative bg-[#EDE7DE] border border-[#D4CFC3]">
        <Link href={`/stories/${story.slug}`}>
          <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-gradient-to-br from-[#D4CEC0] via-[#E5E1DA] to-[#F5F2EB] overflow-hidden">
            {normalizedHeroUrl && (
              <Image
                src={normalizedHeroUrl}
                alt={story.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#E5E1DA] via-transparent to-transparent"></div>
          </div>
          <div className="px-5 sm:px-7 py-6 sm:py-7 lg:py-8 space-y-3 sm:space-y-4">
            <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#988965]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              {story.category}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#1A1A1A] max-w-2xl" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              {story.title}
            </h2>
            {story.dek && (
              <p className="text-sm sm:text-base leading-relaxed text-[#4C4A45] max-w-2xl" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                {story.dek}
              </p>
            )}
            <div className="pt-1">
              <span className="text-[0.75rem] sm:text-xs tracking-[0.26em] uppercase text-[#1A1A1A] inline-flex items-center gap-1 hover:text-[#3D3D3D] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                READ STORY
                <span>→</span>
              </span>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  // Default variant
  return (
    <article className="border-b border-[#D4CFC3] pb-7 sm:pb-8 last:border-b-0 last:pb-0">
      <Link href={`/stories/${story.slug}`}>
        <div className="flex flex-col md:flex-row gap-4 sm:gap-5">
          <div className="md:w-5/12 lg:w-2/5">
            <div className="aspect-[16/9] bg-gradient-to-br from-[#D8D1C5] via-[#E5E1DA] to-[#F5F2EB] overflow-hidden relative">
              {normalizedHeroUrl && (
                <Image
                  src={normalizedHeroUrl}
                  alt={story.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 30vw"
                />
              )}
            </div>
          </div>
          <div className="md:flex-1 space-y-2.5 sm:space-y-3">
            <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#988965]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              {story.category}
            </span>
            <h3 className="text-base sm:text-lg font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              {story.title}
            </h3>
            {story.dek && (
              <p className="text-sm sm:text-base text-[#4C4A45] max-w-xl" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                {story.dek}
              </p>
            )}
            <div className="flex items-center justify-between pt-2 sm:pt-3">
              {story.publishedAt && (
                <span className="text-[0.7rem] tracking-[0.18em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                  {new Date(story.publishedAt as Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
                </span>
              )}
              <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#1A1A1A] inline-flex items-center gap-1 hover:text-[#3D3D3D] transition-colors text-right" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                READ →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

