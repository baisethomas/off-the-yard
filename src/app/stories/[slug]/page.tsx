import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getStoryBySlug } from '@/lib/stories'

export const revalidate = 60

export default async function StoryPage({ params }: { params: { slug: string } }) {
  const story = await getStoryBySlug(params.slug)

  if (!story || !story.approved) {
    notFound()
  }

  return (
    <div className="bg-[#E5E1DA] text-[#1A1A1A] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <section className="mb-10 sm:mb-12 space-y-6">
          {story.heroImageUrl && (
            <div className="aspect-[21/9] bg-gradient-to-br from-[#D4CEC0] via-[#E5E1DA] to-[#F5F2EB] overflow-hidden border border-[#D4CFC3]">
              <img 
                src={story.heroImageUrl} 
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                {story.category || 'Story'}
              </span>
              {story.publishedAt && (
                <span className="text-[0.7rem] tracking-[0.18em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                  {(story.publishedAt instanceof Date 
                    ? story.publishedAt 
                    : (story.publishedAt as any)?.toDate?.() || new Date(story.publishedAt as any)
                  ).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
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
          </div>

          <div className="h-px w-full bg-[#D4CFC3]"></div>
        </section>

        {/* Content Section */}
        <article className="prose prose-lg max-w-none space-y-6 pb-12 sm:pb-16 lg:pb-20">
          <div 
            className="text-base sm:text-lg leading-relaxed text-[#1A1A1A] space-y-6" 
            style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}
            dangerouslySetInnerHTML={{ __html: story.content }}
          />
        </article>

        {/* Back Link */}
        <div className="pt-8 border-t border-[#D4CFC3]">
          <Link 
            href="/stories" 
            className="text-sm tracking-[0.26em] uppercase text-[#7F786A] hover:text-[#1A1A1A] inline-flex items-center gap-2 transition-colors"
            style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
          >
            ← Back to Stories
          </Link>
        </div>
      </div>
    </div>
  )
}

