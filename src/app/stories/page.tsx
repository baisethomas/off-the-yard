import Link from 'next/link'

export default function StoriesPage() {
  return (
    <div className="bg-[#E5E1DA] text-[#1A1A1A] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* STORIES HEADER / HERO */}
        <section className="pt-10 sm:pt-14 lg:pt-16 pb-10 sm:pb-12 lg:pb-14">
          <div className="space-y-5 sm:space-y-6">
            <div className="space-y-3">
              <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#988965]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                OTY // STORIES
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                STORIES
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-[#4C4A45] max-w-xl" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                Interviews, spotlights, and drop recaps from Que-owned brands in the underground.
              </p>
            </div>
            <div className="h-px w-full bg-[#D4CFC3]"></div>

            {/* Featured Story Hero */}
            <article className="relative bg-[#EDE7DE] border border-[#D4CFC3]">
              <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-gradient-to-br from-[#D4CEC0] via-[#E5E1DA] to-[#F5F2EB] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#E5E1DA] via-transparent to-transparent"></div>
              </div>
              <div className="px-5 sm:px-7 py-6 sm:py-7 lg:py-8 space-y-3 sm:space-y-4">
                <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#988965]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                  Spotlight
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#1A1A1A] max-w-2xl" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                  Yard Gods on building a quiet fleece uniform for the Bruhz
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-[#4C4A45] max-w-2xl" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                  Inside the studio where neutral palettes, heavyweight fleece, and yard memories come together in a disciplined daily uniform.
                </p>
                <div className="pt-1">
                  <Link href="/stories/yard-gods-fleece-uniform" className="text-[0.75rem] sm:text-xs tracking-[0.26em] uppercase text-[#1A1A1A] inline-flex items-center gap-1 hover:text-[#3D3D3D] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                    READ STORY
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* STORIES LAYOUT BODY */}
        <section className="pb-12 sm:pb-16 lg:pb-20 border-t border-[#D4CFC3] pt-8 sm:pt-10">
          <div className="grid gap-10 lg:gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            {/* LEFT: MAIN STORY LIST */}
            <div className="space-y-7 sm:space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                  Latest Stories
                </h2>
              </div>

              <div className="space-y-8 sm:space-y-9">
                {/* Story Card 1 */}
                <article className="border-b border-[#D4CFC3] pb-7 sm:pb-8 last:border-b-0 last:pb-0">
                  <div className="flex flex-col md:flex-row gap-4 sm:gap-5">
                    <div className="md:w-5/12 lg:w-2/5">
                      <div className="aspect-[16/9] bg-gradient-to-br from-[#D8D1C5] via-[#E5E1DA] to-[#F5F2EB] overflow-hidden"></div>
                    </div>
                    <div className="md:flex-1 space-y-2.5 sm:space-y-3">
                      <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#988965]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                        Interview
                      </span>
                      <h3 className="text-base sm:text-lg font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                        &quot;We wanted the yard to feel like a studio&quot;: Probate Club on varsity discipline
                      </h3>
                      <p className="text-sm sm:text-base text-[#4C4A45] max-w-xl" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                        The founders of Probate Club break down their approach to cut, color, and carrying line-crossing energy into everyday outerwear.
                      </p>
                      <div className="flex items-center justify-between pt-2 sm:pt-3">
                        <span className="text-[0.7rem] tracking-[0.18em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                          JAN 11, 2026
                        </span>
                        <Link href="/stories/probate-club-varsity-discipline" className="text-[0.7rem] tracking-[0.26em] uppercase text-[#1A1A1A] inline-flex items-center gap-1 hover:text-[#3D3D3D] transition-colors text-right" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                          READ →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Story Card 2 */}
                <article className="border-b border-[#D4CFC3] pb-7 sm:pb-8 last:border-b-0 last:pb-0">
                  <div className="flex flex-col md:flex-row gap-4 sm:gap-5">
                    <div className="md:w-5/12 lg:w-2/5">
                      <div className="aspect-[16/9] bg-gradient-to-br from-[#D0C7B7] via-[#E5E1DA] to-[#F5F2EB] overflow-hidden"></div>
                    </div>
                    <div className="md:flex-1 space-y-2.5 sm:space-y-3">
                      <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                        Drop Recap
                      </span>
                      <h3 className="text-base sm:text-lg font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                        Inside Capsule 014: the &quot;Line Crossing&quot; fleece set that sold out in hours
                      </h3>
                      <p className="text-sm sm:text-base text-[#4C4A45] max-w-xl" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                        Notes from the drop, what sizes moved first, and how Yard Gods is thinking about restocks without killing the moment.
                      </p>
                      <div className="flex items-center justify-between pt-2 sm:pt-3">
                        <span className="text-[0.7rem] tracking-[0.18em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                          JAN 02, 2026
                        </span>
                        <Link href="/stories/capsule-014-line-crossing" className="text-[0.7rem] tracking-[0.26em] uppercase text-[#1A1A1A] inline-flex items-center gap-1 hover:text-[#3D3D3D] transition-colors text-right" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                          READ →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Story Card 3 */}
                <article className="border-b border-[#D4CFC3] pb-7 sm:pb-8 last:border-b-0 last:pb-0">
                  <div className="flex flex-col md:flex-row gap-4 sm:gap-5">
                    <div className="md:w-5/12 lg:w-2/5">
                      <div className="aspect-[16/9] bg-gradient-to-br from-[#D6CEC1] via-[#E5E1DA] to-[#F5F2EB] overflow-hidden"></div>
                    </div>
                    <div className="md:flex-1 space-y-2.5 sm:space-y-3">
                      <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#988965]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                        Brands
                      </span>
                      <h3 className="text-base sm:text-lg font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                        Bruhz Archive and the art of making campus staples feel ceremonial
                      </h3>
                      <p className="text-sm sm:text-base text-[#4C4A45] max-w-xl" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                        From graphic balance to fabric weight, Bruhz Archive talks about honoring tradition without leaning on clichés.
                      </p>
                      <div className="flex items-center justify-between pt-2 sm:pt-3">
                        <span className="text-[0.7rem] tracking-[0.18em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                          DEC 18, 2025
                        </span>
                        <Link href="/stories/bruhz-archive-ceremonial-staples" className="text-[0.7rem] tracking-[0.26em] uppercase text-[#1A1A1A] inline-flex items-center gap-1 hover:text-[#3D3D3D] transition-colors text-right" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                          READ →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Story Card 4 */}
                <article className="border-b border-[#D4CFC3] pb-7 sm:pb-8 last:border-b-0 last:pb-0">
                  <div className="flex flex-col md:flex-row gap-4 sm:gap-5">
                    <div className="md:w-5/12 lg:w-2/5">
                      <div className="aspect-[16/9] bg-gradient-to-br from-[#D4CEC0] via-[#E5E1DA] to-[#F5F2EB] overflow-hidden"></div>
                    </div>
                    <div className="md:flex-1 space-y-2.5 sm:space-y-3">
                      <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                        Business
                      </span>
                      <h3 className="text-base sm:text-lg font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                        How Que-owned brands are quietly scaling without losing the yard
                      </h3>
                      <p className="text-sm sm:text-base text-[#4C4A45] max-w-xl" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                        A look at wholesale, direct drops, and storytelling as a moat for underground Que-owned labels.
                      </p>
                      <div className="flex items-center justify-between pt-2 sm:pt-3">
                        <span className="text-[0.7rem] tracking-[0.18em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                          DEC 07, 2025
                        </span>
                        <Link href="/stories/que-owned-scaling" className="text-[0.7rem] tracking-[0.26em] uppercase text-[#1A1A1A] inline-flex items-center gap-1 hover:text-[#3D3D3D] transition-colors text-right" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                          READ →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              {/* Pagination / Load More */}
              <div className="pt-4 sm:pt-6 flex justify-center">
                <button className="border border-[#C4B9A3] bg-[#EDE7DE] text-[#1A1A1A] text-xs sm:text-sm tracking-[0.22em] uppercase py-2.5 px-7 sm:px-8 hover:bg-[#1A1A1A] hover:text-[#F5F2EB] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                  Load more stories
                </button>
              </div>
            </div>

            {/* RIGHT: SIDEBAR */}
            <aside className="space-y-8 sm:space-y-9">
              {/* Most Read / On Our Radar */}
              <div className="space-y-4 sm:space-y-5">
                <h3 className="text-sm sm:text-base font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                  On Our Radar
                </h3>
                <div className="space-y-4">
                  {/* Mini story 1 */}
                  <article className="border-b border-[#D4CFC3] pb-4 last:border-b-0 last:pb-0">
                    <span className="text-[0.65rem] tracking-[0.22em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Drop Recap
                    </span>
                    <h4 className="mt-1 text-sm sm:text-base font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                      Night games on the yard: recap of the Midnight track pant release
                    </h4>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[0.65rem] tracking-[0.18em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                        NOV 29, 2025
                      </span>
                      <Link href="/stories/midnight-track-pant-release" className="text-[0.65rem] tracking-[0.26em] uppercase text-[#1A1A1A] hover:text-[#3D3D3D] transition-colors text-right" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                        READ →
                      </Link>
                    </div>
                  </article>

                  {/* Mini story 2 */}
                  <article className="border-b border-[#D4CFC3] pb-4 last:border-b-0 last:pb-0">
                    <span className="text-[0.65rem] tracking-[0.22em] uppercase text-[#988965]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Spotlight
                    </span>
                    <h4 className="mt-1 text-sm sm:text-base font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                      Yard Runners on designing for movement and ceremony
                    </h4>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[0.65rem] tracking-[0.18em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                        NOV 12, 2025
                      </span>
                      <Link href="/stories/yard-runners-movement-ceremony" className="text-[0.65rem] tracking-[0.26em] uppercase text-[#1A1A1A] hover:text-[#3D3D3D] transition-colors text-right" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                        READ →
                      </Link>
                    </div>
                  </article>

                  {/* Mini story 3 */}
                  <article className="border-b border-[#D4CFC3] pb-4 last:border-b-0 last:pb-0">
                    <span className="text-[0.65rem] tracking-[0.22em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Interview
                    </span>
                    <h4 className="mt-1 text-sm sm:text-base font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                      How one Que-owned brand uses the yard as a living moodboard
                    </h4>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[0.65rem] tracking-[0.18em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                        OCT 30, 2025
                      </span>
                      <Link href="/stories/yard-moodboard" className="text-[0.65rem] tracking-[0.26em] uppercase text-[#1A1A1A] hover:text-[#3D3D3D] transition-colors text-right" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                        READ →
                      </Link>
                    </div>
                  </article>
                </div>
              </div>

              {/* Tags / Topics */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm sm:text-base font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                  Topics
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  <button className="border border-[#C4B9A3] bg-[#EDE7DE] text-[0.75rem] tracking-[0.18em] uppercase text-[#1A1A1A] py-1.5 px-3.5 hover:bg-[#1A1A1A] hover:text-[#F5F2EB] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                    Brands
                  </button>
                  <button className="border border-[#C4B9A3] bg-[#EDE7DE] text-[0.75rem] tracking-[0.18em] uppercase text-[#1A1A1A] py-1.5 px-3.5 hover:bg-[#1A1A1A] hover:text-[#F5F2EB] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                    Drops
                  </button>
                  <button className="border border-[#C4B9A3] bg-[#EDE7DE] text-[0.75rem] tracking-[0.18em] uppercase text-[#1A1A1A] py-1.5 px-3.5 hover:bg-[#1A1A1A] hover:text-[#F5F2EB] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                    Interviews
                  </button>
                  <button className="border border-[#C4B9A3] bg-[#EDE7DE] text-[0.75rem] tracking-[0.18em] uppercase text-[#1A1A1A] py-1.5 px-3.5 hover:bg-[#1A1A1A] hover:text-[#F5F2EB] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                    Business
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  )
}

