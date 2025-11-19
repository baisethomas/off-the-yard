import Link from 'next/link'

export default function CollectionsPage() {
  return (
    <div className="bg-[#F5F2EC] text-[#111111] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12 lg:py-16 space-y-8 sm:space-y-10 lg:space-y-14">
        {/* Header Section */}
        <section className="space-y-4 sm:space-y-5">
          <div className="flex flex-col gap-3">
            <span className="text-xs sm:text-sm tracking-[0.24em] uppercase text-[#A19688]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              CURATED COLLECTIONS
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#111111]" style={{ fontFamily: "'Times New Roman', ui-serif, Georgia, 'Times', serif" }}>
                  Collections
                </h1>
                <p className="mt-2 text-base sm:text-lg text-[#5F5A52] max-w-2xl leading-relaxed" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                  Culturally curated capsules from Que-owned streetwear brands. Consider these digital racks composed with intention and restraint.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#7F7A70]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                <span className="inline-flex h-2 w-2 rounded-full bg-[#7F6C55]"></span>
                <span>6 collections live</span>
              </div>
            </div>
          </div>
          <div className="h-px bg-[#D4CBBE] w-full"></div>
        </section>

        {/* Category Filter Bar */}
        <section className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button className="inline-flex items-center rounded-full border border-[#111111] bg-transparent text-[0.7rem] sm:text-xs tracking-[0.22em] uppercase text-[#111111] px-3 sm:px-4 py-1.5" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#111111] mr-1.5"></span>
            All
          </button>
          <button className="inline-flex items-center rounded-full border border-transparent bg-transparent text-[0.7rem] sm:text-xs tracking-[0.22em] uppercase text-[#7F7A70] hover:text-[#111111] hover:border-[#B7A48B] transition-colors px-3 sm:px-4 py-1.5" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
            Apparel
          </button>
          <button className="inline-flex items-center rounded-full border border-transparent bg-transparent text-[0.7rem] sm:text-xs tracking-[0.22em] uppercase text-[#7F7A70] hover:text-[#111111] hover:border-[#B7A48B] transition-colors px-3 sm:px-4 py-1.5" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
            Hats
          </button>
          <button className="inline-flex items-center rounded-full border border-transparent bg-transparent text-[0.7rem] sm:text-xs tracking-[0.22em] uppercase text-[#7F7A70] hover:text-[#111111] hover:border-[#B7A48B] transition-colors px-3 sm:px-4 py-1.5" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
            Outerwear
          </button>
          <button className="inline-flex items-center rounded-full border border-transparent bg-transparent text-[0.7rem] sm:text-xs tracking-[0.22em] uppercase text-[#7F7A70] hover:text-[#111111] hover:border-[#B7A48B] transition-colors px-3 sm:px-4 py-1.5" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
            Lifestyle
          </button>
          <button className="inline-flex items-center rounded-full border border-transparent bg-transparent text-[0.7rem] sm:text-xs tracking-[0.22em] uppercase text-[#7F7A70] hover:text-[#111111] hover:border-[#B7A48B] transition-colors px-3 sm:px-4 py-1.5" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
            Digital
          </button>
          <div className="ml-auto flex items-center gap-2 text-[0.7rem] sm:text-xs text-[#7F7A70]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
            <span className="hidden sm:inline">Sort by</span>
            <button className="inline-flex items-center gap-1 border border-[#D4CBBE] rounded-full px-3 py-1 bg-[#F5F2EC]/60 hover:bg-[#F5F2EC] transition-colors">
              <span>Newest</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </section>

        {/* Featured Collection Hero Card */}
        <section>
          <article className="relative w-full overflow-hidden rounded-2xl border border-[#D4CBBE] bg-[#F5F2EC]">
            <div className="aspect-[16/9] sm:aspect-[21/9] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4CEC0] via-[#E5E1DA] to-[#F5F2EB]"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2EC] via-[#F5F2EC]/80 to-transparent"></div>

              <div className="relative h-full flex flex-col justify-between p-5 sm:p-8 lg:p-10">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-none border border-[#B7A48B] bg-[#F5F2EC]/80 text-[0.7rem] sm:text-xs tracking-[0.22em] uppercase text-[#7F6C55] px-3 sm:px-4 py-1.5" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                    Featured Capsule
                  </span>
                  <div className="hidden sm:flex items-center gap-1 text-[0.7rem] text-[#7F7A70]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                    <span>12 pieces</span>
                    <span className="h-1 w-1 rounded-full bg-[#B7A48B]"></span>
                    <span>Updated weekly</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4 max-w-xl">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#111111]" style={{ fontFamily: "'Times New Roman', ui-serif, Georgia, 'Times', serif" }}>
                    BRUHZ PICKS
                  </h2>
                  <p className="text-base sm:text-lg text-[#4C463E] leading-relaxed" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                    A rotation of favorites from the underground. A considered edit of pieces that live beyond the moment.
                  </p>
                </div>

                <div className="mt-3 sm:mt-4 flex items-center justify-between gap-4">
                  <Link href="/collections/bruhz-picks" className="inline-flex items-center gap-2 rounded-none border border-[#111111] bg-transparent text-[0.7rem] sm:text-xs tracking-[0.22em] uppercase text-[#111111] px-4 sm:px-5 py-2 hover:bg-[#111111] hover:text-[#F5F2EC] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                    View Collection
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                  <div className="hidden sm:flex items-center gap-2 text-xs text-[#7F7A70]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                    <span>Handpicked by the Off the Yard team</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* Collection Grid */}
        <section className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <article className="group relative overflow-hidden rounded-none border border-[#D4CBBE] bg-[#F5F2EC]">
              <div className="aspect-[4/5] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D8D1C5] via-[#E5E1DA] to-[#F5F2EB] transition-transform duration-500 group-hover:scale-[1.03]"></div>
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#F5F2EC] via-[#F5F2EC]/90 to-transparent"></div>

                <div className="relative h-full flex flex-col justify-between p-4 sm:p-5">
                  <div className="flex justify-between items-start">
                    <span className="inline-flex items-center rounded-none bg-[#F5F2EC]/80 text-[0.6rem] sm:text-[0.7rem] tracking-[0.22em] uppercase text-[#7F6C55] px-2.5 py-1 border border-[#D4CBBE]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Apparel
                    </span>
                    <span className="text-[0.6rem] tracking-[0.18em] uppercase text-[#7F7A70]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      18 pieces
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[#111111]" style={{ fontFamily: "'Times New Roman', ui-serif, Georgia, 'Times', serif" }}>
                      STREETWEAR HEAT
                    </h3>
                    <p className="text-sm sm:text-base text-[#5F5A52] leading-relaxed" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                      Fresh drops from the underground. Graphic staples elevated through proportion, fabric, and restraint.
                    </p>
                    <Link href="/collections/streetwear-heat" className="mt-3 inline-flex items-center justify-center gap-2 rounded-none border border-[#111111] bg-transparent text-[0.65rem] sm:text-[0.7rem] tracking-[0.22em] uppercase text-[#111111] px-3 py-1.5 hover:bg-[#111111] hover:text-[#F5F2EC] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      View Collection
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Card 2 */}
            <article className="group relative overflow-hidden rounded-none border border-[#D4CBBE] bg-[#F5F2EC]">
              <div className="aspect-[4/5] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D0C7B7] via-[#E5E1DA] to-[#F5F2EB] transition-transform duration-500 group-hover:scale-[1.03]"></div>
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#F5F2EC] via-[#F5F2EC]/90 to-transparent"></div>

                <div className="relative h-full flex flex-col justify-between p-4 sm:p-5">
                  <div className="flex justify-between items-start">
                    <span className="inline-flex items-center rounded-none bg-[#F5F2EC]/80 text-[0.6rem] sm:text-[0.7rem] tracking-[0.22em] uppercase text-[#7F6C55] px-2.5 py-1 border border-[#D4CBBE]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Hats
                    </span>
                    <span className="text-[0.6rem] tracking-[0.18em] uppercase text-[#7F7A70]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      9 pieces
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[#111111]" style={{ fontFamily: "'Times New Roman', ui-serif, Georgia, 'Times', serif" }}>
                      YARD FITTEDS
                    </h3>
                    <p className="text-sm sm:text-base text-[#5F5A52] leading-relaxed" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                      Chapter caps and script logos treated as uniforms—quiet, considered, and enduring.
                    </p>
                    <Link href="/collections/yard-fitteds" className="mt-3 inline-flex items-center justify-center gap-2 rounded-none border border-[#111111] bg-transparent text-[0.65rem] sm:text-[0.7rem] tracking-[0.22em] uppercase text-[#111111] px-3 py-1.5 hover:bg-[#111111] hover:text-[#F5F2EC] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      View Collection
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Card 3 */}
            <article className="group relative overflow-hidden rounded-none border border-[#D4CBBE] bg-[#F5F2EC]">
              <div className="aspect-[4/5] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D6CEC1] via-[#E5E1DA] to-[#F5F2EB] transition-transform duration-500 group-hover:scale-[1.03]"></div>
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#F5F2EC] via-[#F5F2EC]/90 to-transparent"></div>

                <div className="relative h-full flex flex-col justify-between p-4 sm:p-5">
                  <div className="flex justify-between items-start">
                    <span className="inline-flex items-center rounded-none bg-[#F5F2EC]/80 text-[0.6rem] sm:text-[0.7rem] tracking-[0.22em] uppercase text-[#7F6C55] px-2.5 py-1 border border-[#D4CBBE]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Outerwear
                    </span>
                    <span className="text-[0.6rem] tracking-[0.18em] uppercase text-[#7F7A70]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      11 pieces
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[#111111]" style={{ fontFamily: "'Times New Roman', ui-serif, Georgia, 'Times', serif" }}>
                      HOMECOMING NIGHTS
                    </h3>
                    <p className="text-sm sm:text-base text-[#5F5A52] leading-relaxed" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                      Windbreakers and varsity layers with a restrained palette and generous, timeless cuts.
                    </p>
                    <Link href="/collections/homecoming-nights" className="mt-3 inline-flex items-center justify-center gap-2 rounded-none border border-[#111111] bg-transparent text-[0.65rem] sm:text-[0.7rem] tracking-[0.22em] uppercase text-[#111111] px-3 py-1.5 hover:bg-[#111111] hover:text-[#F5F2EC] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      View Collection
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Card 4 */}
            <article className="group relative overflow-hidden rounded-none border border-[#D4CBBE] bg-[#F5F2EC]">
              <div className="aspect-[4/5] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4CEC0] via-[#E5E1DA] to-[#F5F2EB] transition-transform duration-500 group-hover:scale-[1.03]"></div>
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#F5F2EC] via-[#F5F2EC]/90 to-transparent"></div>

                <div className="relative h-full flex flex-col justify-between p-4 sm:p-5">
                  <div className="flex justify-between items-start">
                    <span className="inline-flex items-center rounded-none bg-[#F5F2EC]/80 text-[0.6rem] sm:text-[0.7rem] tracking-[0.22em] uppercase text-[#7F6C55] px-2.5 py-1 border border-[#D4CBBE]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Lifestyle
                    </span>
                    <span className="text-[0.6rem] tracking-[0.18em] uppercase text-[#7F7A70]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      7 pieces
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[#111111]" style={{ fontFamily: "'Times New Roman', ui-serif, Georgia, 'Times', serif" }}>
                      LINE JACKET ENERGY
                    </h3>
                    <p className="text-sm sm:text-base text-[#5F5A52] leading-relaxed" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                      Totes, accessories, and small objects designed to feel essential rather than extra.
                    </p>
                    <Link href="/collections/line-jacket-energy" className="mt-3 inline-flex items-center justify-center gap-2 rounded-none border border-[#111111] bg-transparent text-[0.65rem] sm:text-[0.7rem] tracking-[0.22em] uppercase text-[#111111] px-3 py-1.5 hover:bg-[#111111] hover:text-[#F5F2EC] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      View Collection
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Card 5 */}
            <article className="group relative overflow-hidden rounded-none border border-[#D4CBBE] bg-[#F5F2EC]">
              <div className="aspect-[4/5] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D8D1C5] via-[#E5E1DA] to-[#F5F2EB] transition-transform duration-500 group-hover:scale-[1.03]"></div>
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#F5F2EC] via-[#F5F2EC]/90 to-transparent"></div>

                <div className="relative h-full flex flex-col justify-between p-4 sm:p-5">
                  <div className="flex justify-between items-start">
                    <span className="inline-flex items-center rounded-none bg-[#F5F2EC]/80 text-[0.6rem] sm:text-[0.7rem] tracking-[0.22em] uppercase text-[#7F6C55] px-2.5 py-1 border border-[#D4CBBE]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Digital
                    </span>
                    <span className="text-[0.6rem] tracking-[0.18em] uppercase text-[#7F7A70]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      24 files
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[#111111]" style={{ fontFamily: "'Times New Roman', ui-serif, Georgia, 'Times', serif" }}>
                      FLYER PACK ARCHIVE
                    </h3>
                    <p className="text-sm sm:text-base text-[#5F5A52] leading-relaxed" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                      Templates and digital assets refined to feel collectible, not disposable.
                    </p>
                    <Link href="/collections/flyer-pack-archive" className="mt-3 inline-flex items-center justify-center gap-2 rounded-none border border-[#111111] bg-transparent text-[0.65rem] sm:text-[0.7rem] tracking-[0.22em] uppercase text-[#111111] px-3 py-1.5 hover:bg-[#111111] hover:text-[#F5F2EC] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      View Collection
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Card 6 */}
            <article className="group relative overflow-hidden rounded-none border border-[#D4CBBE] bg-[#F5F2EC]">
              <div className="aspect-[4/5] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D0C7B7] via-[#E5E1DA] to-[#F5F2EB] transition-transform duration-500 group-hover:scale-[1.03]"></div>
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#F5F2EC] via-[#F5F2EC]/90 to-transparent"></div>

                <div className="relative h-full flex flex-col justify-between p-4 sm:p-5">
                  <div className="flex justify-between items-start">
                    <span className="inline-flex items-center rounded-none bg-[#F5F2EC]/80 text-[0.6rem] sm:text-[0.7rem] tracking-[0.22em] uppercase text-[#7F6C55] px-2.5 py-1 border border-[#D4CBBE]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Mixed
                    </span>
                    <span className="text-[0.6rem] tracking-[0.18em] uppercase text-[#7F7A70]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Curated
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[#111111]" style={{ fontFamily: "'Times New Roman', ui-serif, Georgia, 'Times', serif" }}>
                      YARD ARCHIVE FILES
                    </h3>
                    <p className="text-sm sm:text-base text-[#5F5A52] leading-relaxed" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                      Rotating pulls from past seasons, edited into a calm, archival narrative.
                    </p>
                    <Link href="/collections/yard-archive-files" className="mt-3 inline-flex items-center justify-center gap-2 rounded-none border border-[#111111] bg-transparent text-[0.65rem] sm:text-[0.7rem] tracking-[0.22em] uppercase text-[#111111] px-3 py-1.5 hover:bg-[#111111] hover:text-[#F5F2EC] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      View Collection
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  )
}

