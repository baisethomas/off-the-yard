import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="bg-[#E5E1DA] text-[#1A1A1A] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12 lg:py-16">
        {/* Header */}
        <section className="mb-10 sm:mb-12 space-y-4">
          <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
            ABOUT
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            About Off the Yard
          </h1>
          <div className="h-px w-full bg-[#D4CFC3]"></div>
        </section>

        {/* Content */}
        <article className="prose prose-lg max-w-none space-y-6">
          <div className="text-base sm:text-lg leading-relaxed text-[#1A1A1A] space-y-6" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
            <p>
              Off the Yard is a curated underground marketplace for Que-owned streetwear brands. We&apos;re building a quiet, considered edit of pieces that move easily from yard to city—neutral palettes, familiar silhouettes, and brands that honor tradition without leaning on clichés.
            </p>

            <p>
              Our mission is simple: discover the brands, then link out to support the Bruhz directly. We don&apos;t hold inventory. We don&apos;t take a cut. We&apos;re here to amplify Que-owned brands building quiet, disciplined uniforms for everyday campus wear.
            </p>

            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1A1A1A] mt-10 mb-4" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              For Brands
            </h2>
            <p>
              If you&apos;re a Que-owned brand making streetwear, we want to feature you. Our curation process focuses on quality, authenticity, and a commitment to the yard aesthetic. We&apos;re looking for brands that understand restraint, proportion, and the power of quiet design.
            </p>
            <p>
              <Link href="/dashboard" className="text-[#1A1A1A] border-b border-[#1A1A1A] hover:border-transparent transition-colors">
                Apply to join Off the Yard
              </Link>
            </p>

            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1A1A1A] mt-10 mb-4" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              For Shoppers
            </h2>
            <p>
              Every product on Off the Yard links directly to the brand&apos;s storefront. When you click through, you&apos;re buying directly from the Bruhz—no middleman, no markup. We&apos;re here to help you discover, not to take a cut.
            </p>

            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1A1A1A] mt-10 mb-4" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              Contact
            </h2>
            <p>
              Questions? Brand inquiries? Story pitches? Reach out at{' '}
              <a href="mailto:hello@offtheyard.com" className="text-[#1A1A1A] border-b border-[#1A1A1A] hover:border-transparent transition-colors">
                hello@offtheyard.com
              </a>
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}

