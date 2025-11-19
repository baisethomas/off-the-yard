import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getStoryBySlug, getStories } from '@/lib/stories'
import { Story } from '@/types/story'

// Normalize Shopify image URLs
function normalizeImageUrl(url: string): string {
  if (url.includes('{width}')) {
    return url.replace(/\{width\}/g, '2048')
  }
  return url
}

export const revalidate = 60

interface StoryPageProps {
  params: {
    slug: string
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  const story = await getStoryBySlug(params.slug)
  const recentStories = await getStories(3)

  if (!story) {
    notFound()
  }

  const normalizedHeroUrl = story.heroImageUrl ? normalizeImageUrl(story.heroImageUrl) : null

  return (
    <div className="bg-[#E5E1DA] text-[#1A1A1A] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Hero Image */}
        {normalizedHeroUrl && (
          <section className="pt-10 sm:pt-12 lg:pt-16 pb-8 sm:pb-10">
            <div className="relative aspect-[21/9] w-full overflow-hidden border border-[#D4CFC3]">
              <Image
                src={normalizedHeroUrl}
                alt={story.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </section>
        )}

        {/* Story Content */}
        <article className="pb-12 sm:pb-16 lg:pb-20">
          {/* Header */}
          <header className="mb-8 sm:mb-10 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#988965]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                {story.category}
              </span>
              {story.publishedAt && (
                <span className="text-[0.7rem] tracking-[0.18em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                  {new Date(story.publishedAt as Date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              {story.title}
            </h1>
            {story.dek && (
              <p className="text-lg sm:text-xl leading-relaxed text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                {story.dek}
              </p>
            )}
            {story.authorName && (
              <p className="text-sm text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                By {story.authorName}
              </p>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div
              className="text-base sm:text-lg leading-relaxed text-[#1A1A1A] space-y-6"
              style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}
              dangerouslySetInnerHTML={{ __html: story.content }}
            />
          </div>
        </article>

        {/* Related Stories */}
        {recentStories.length > 0 && (
          <section className="border-t border-[#D4CFC3] pt-10 sm:pt-12 pb-12 sm:pb-16">
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-[#1A1A1A] mb-8" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              More Stories
            </h2>
            <div className="space-y-6">
              {recentStories
                .filter((s) => s.id !== story.id)
                .slice(0, 3)
                .map((relatedStory) => (
                  <Link key={relatedStory.id} href={`/stories/${relatedStory.slug}`} className="block border-b border-[#D4CFC3] pb-6 last:border-b-0 last:pb-0">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-1/3">
                        <div className="aspect-[16/9] bg-gradient-to-br from-[#D8D1C5] via-[#E5E1DA] to-[#F5F2EB]"></div>
                      </div>
                      <div className="md:flex-1 space-y-2">
                        <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#988965]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                          {relatedStory.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                          {relatedStory.title}
                        </h3>
                        {relatedStory.dek && (
                          <p className="text-sm sm:text-base text-[#4C4A45] line-clamp-2" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                            {relatedStory.dek}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

