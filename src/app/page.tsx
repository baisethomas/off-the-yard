import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
      {/* Hero */}
      <section className="sm:py-16 lg:py-20 pt-12 pb-12 relative">
        <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Text */}
          <div className="space-y-8">
                <div className="inline-flex items-center">
                  <span className="inline-flex items-center text-[0.7rem] sm:text-xs tracking-[0.26em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                    Que-Owned Streetwear
                  </span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                    <span className="block">Modern yard</span>
                    <span className="block">uniforms for</span>
                    <span className="block">the Bruhz.</span>
                  </h1>
                </div>

                <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                  A quiet, considered edit of Que-owned streetwear and lifestyle pieces. Discover the brands, then link out to support the Bruhz directly.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link href="/collections" className="inline-flex items-center justify-center rounded-none border border-[#1A1A1A] bg-[#1A1A1A] text-[#F5F2EB] text-sm sm:text-base font-normal tracking-[0.22em] uppercase py-2.5 sm:py-3 px-6 sm:px-8 hover:bg-transparent hover:text-[#1A1A1A] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                    Shop drops
                  </Link>
                  <Link href="/brands" className="inline-flex items-center justify-center rounded-none border border-transparent text-sm sm:text-base font-normal tracking-[0.22em] uppercase text-[#4C4A45] hover:text-[#1A1A1A] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                    Explore brands
                  </Link>
                </div>
              </div>

          {/* Right: Collage */}
          <div className="relative">
                <div className="relative max-w-md ml-auto">
                  {/* Main card */}
                  <div className="relative rounded-none bg-[#DCD6CA] overflow-hidden border border-[#D0C7B7] shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
                    <div className="aspect-[3/4] bg-gradient-to-br from-[#D4CEC0] via-[#DCD6CA] to-[#EFEAE0]">
                      <div className="h-full w-full flex items-end justify-between p-5 sm:p-6">
                        <div className="space-y-4">
                          <p className="text-xs text-[#7F786A] uppercase tracking-[0.26em]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                            Capsule 014
                          </p>
                          <div>
                            <p className="text-xs text-[#7F786A] uppercase tracking-[0.26em] mb-1" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                              Yard Gods Studio
                            </p>
                            <p className="text-xl sm:text-2xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                              Line Crossing fleece set
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          <span className="text-[0.65rem] uppercase tracking-[0.26em] text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                            Que-Owned
                          </span>
                          <div className="h-12 w-12 border border-[#C4B9A3] bg-[#E5E1DA] flex items-center justify-center">
                            <span className="tracking-[0.28em] text-[0.6rem] text-[#1A1A1A] uppercase" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                              OTY
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom strip */}
                    <div className="border-t border-[#D0C7B7] bg-[#EDE7DE] flex items-center justify-between px-5 sm:px-6 py-3">
                      <p className="text-xs sm:text-sm text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                        Heavyweight fleece in a neutral yard palette. Clean lines, campus ease.
                      </p>
                      <span className="ml-4 text-[0.65rem] uppercase tracking-[0.26em] text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                        Link out
                      </span>
                    </div>
                  </div>

                  {/* Overlapping smaller card */}
                  <div className="absolute -bottom-8 -left-4 sm:-left-10 w-[70%] sm:w-[60%]">
                    <div className="border border-[#D0C7B7] bg-[#EDE7DE]">
                      <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4">
                        <div className="space-y-1">
                          <span className="text-[0.65rem] tracking-[0.26em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                            Capsule 014
                          </span>
                          <p className="text-xs sm:text-sm text-[#1A1A1A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                            Yard Gods "Line Crossing" set
                          </p>
                        </div>
                        <button className="inline-flex items-center text-[0.65rem] sm:text-xs tracking-[0.26em] uppercase text-[#7F786A] hover:text-[#1A1A1A] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                          Link out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </section>

      {/* Fresh Drops */}
      <section className="relative border-t border-[#D4CFC3] pt-10 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-18">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1A1A1A] mb-2" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                  New arrivals
                </h2>
                <p className="text-sm sm:text-base text-[#4C4A45] max-w-md" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                  A focused selection of Que-owned pieces in a neutral, everyday yard palette.
                </p>
              </div>
              <Link href="/collections" className="text-[0.7rem] sm:text-xs tracking-[0.26em] uppercase text-[#7F786A] hover:text-[#1A1A1A] inline-flex items-center gap-2 self-start sm:self-auto" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                View all
              </Link>
            </div>

        {/* Product Card Grid */}
        <div className="grid gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Product Card Component 1 */}
              <article className="group bg-[#EDE7DE] rounded-none overflow-hidden border border-[#D4CFC3] transition-colors duration-300">
                <div className="relative overflow-hidden rounded-b-none">
                  <div className="aspect-[3/4] bg-gradient-to-b from-[#D4CEC0] via-[#E5E1DA] to-[#F5F2EB]">
                    <div className="h-full w-full transform transition-transform duration-300 group-hover:scale-[1.02]">
                      <div className="h-full w-full flex items-end justify-between p-4">
                        <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A] bg-[#E5E1DA]/80 rounded-none py-1 px-2.5" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                          New
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5 space-y-2">
                  <h3 className="text-sm sm:text-base font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                    Line Crossing heavyweight hoodie
                  </h3>
                  <p className="text-sm text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                    Yard Gods Studio
                  </p>
                  <div className="flex items-center justify-between text-[0.7rem] text-[#7F786A] pt-3">
                    <span className="tracking-[0.26em] uppercase" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Capsule 014
                    </span>
                    <button className="ml-2 text-[0.65rem] tracking-[0.26em] uppercase text-[#7F786A] group-hover:text-[#1A1A1A] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Link out
                    </button>
                  </div>
                </div>
              </article>

              {/* Product Card Component 2 */}
              <article className="group bg-[#EDE7DE] rounded-none overflow-hidden border border-[#D4CFC3] transition-colors duration-300">
                <div className="relative overflow-hidden rounded-b-none">
                  <div className="aspect-[3/4] bg-gradient-to-b from-[#D8D1C5] via-[#E5E1DA] to-[#F5F2EB]">
                    <div className="h-full w-full transform transition-transform duration-300 group-hover:scale-[1.02]">
                      <div className="h-full w-full flex items-end justify-between p-4">
                        <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A] bg-[#E5E1DA]/80 rounded-none py-1 px-2.5" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                          Featured
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5 space-y-2">
                  <h3 className="text-sm sm:text-base font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                    Yard line varsity jacket
                  </h3>
                  <p className="text-sm text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                    Probate Club
                  </p>
                  <div className="flex items-center justify-between text-[0.7rem] text-[#7F786A] pt-3">
                    <span className="tracking-[0.26em] uppercase" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Capsule 013
                    </span>
                    <button className="ml-2 text-[0.65rem] tracking-[0.26em] uppercase text-[#7F786A] group-hover:text-[#1A1A1A] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Link out
                    </button>
                  </div>
                </div>
              </article>

              {/* Product Card Component 3 */}
              <article className="group bg-[#EDE7DE] rounded-none overflow-hidden border border-[#D4CFC3] transition-colors duration-300">
                <div className="relative overflow-hidden rounded-b-none">
                  <div className="aspect-[3/4] bg-gradient-to-b from-[#D0C7B7] via-[#E5E1DA] to-[#F5F2EB]">
                    <div className="h-full w-full transform transition-transform duration-300 group-hover:scale-[1.02]">
                      <div className="h-full w-full flex items-end justify-between p-4">
                        <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A] bg-[#E5E1DA]/80 rounded-none py-1 px-2.5" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                          Capsule
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5 space-y-2">
                  <h3 className="text-sm sm:text-base font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                    Yard crest oversized tee
                  </h3>
                  <p className="text-sm text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                    Bruhz Archive
                  </p>
                  <div className="flex items-center justify-between text-[0.7rem] text-[#7F786A] pt-3">
                    <span className="tracking-[0.26em] uppercase" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Capsule 012
                    </span>
                    <button className="ml-2 text-[0.65rem] tracking-[0.26em] uppercase text-[#7F786A] group-hover:text-[#1A1A1A] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Link out
                    </button>
                  </div>
                </div>
              </article>

              {/* Product Card Component 4 */}
              <article className="group bg-[#EDE7DE] rounded-none overflow-hidden border border-[#D4CFC3] transition-colors duration-300">
                <div className="relative overflow-hidden rounded-b-none">
                  <div className="aspect-[3/4] bg-gradient-to-b from-[#D6CEC1] via-[#E5E1DA] to-[#F5F2EB]">
                    <div className="h-full w-full transform transition-transform duration-300 group-hover:scale-[1.02]">
                      <div className="h-full w-full flex items-end justify-between p-4">
                        <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A] bg-[#E5E1DA]/80 rounded-none py-1 px-2.5" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                          Limited
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5 space-y-2">
                  <h3 className="text-sm sm:text-base font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                    Midnight track pant
                  </h3>
                  <p className="text-sm text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                    Yard Runners
                  </p>
                  <div className="flex items-center justify-between text-[0.7rem] text-[#7F786A] pt-3">
                    <span className="tracking-[0.26em] uppercase" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Capsule 011
                    </span>
                    <button className="ml-2 text-[0.65rem] tracking-[0.26em] uppercase text-[#7F786A] group-hover:text-[#1A1A1A] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                      Link out
                    </button>
                  </div>
                </div>
              </article>
            </div>
      </section>

      {/* Featured Brands */}
      <section className="relative bg-[#EDE7DE] border border-[#D4CFC3] py-10 sm:py-12 lg:py-14 mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 mb-8">
              <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                Featured brands
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Off the yard, on your back.
              </h2>
            </div>

        <div className="relative">
          {/* Horizontal Scroll */}
          <div className="overflow-x-auto">
                <div className="flex gap-6 sm:gap-8 pr-6 sm:pr-10">
                  {/* Brand Card */}
                  <Link href="/brands" className="min-w-[12rem] sm:min-w-[14rem]">
                    <div className="aspect-square sm:aspect-[4/3] bg-gradient-to-br from-[#D4CEC0] via-[#E5E1DA] to-[#F5F2EB] border border-[#D4CFC3]"></div>
                    <div className="pt-4 space-y-1.5">
                      <h3 className="text-sm sm:text-base font-medium tracking-tight uppercase text-[#1A1A1A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                        Yard Gods Studio
                      </h3>
                      <p className="text-xs text-[#7F786A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                        Que-owned fleece and jersey
                      </p>
                    </div>
                  </Link>

                  {/* Brand Card */}
                  <Link href="/brands" className="min-w-[12rem] sm:min-w-[14rem]">
                    <div className="aspect-square sm:aspect-[4/3] bg-gradient-to-br from-[#D8D1C5] via-[#E5E1DA] to-[#F5F2EB] border border-[#D4CFC3]"></div>
                    <div className="pt-4 space-y-1.5">
                      <h3 className="text-sm sm:text-base font-medium tracking-tight uppercase text-[#1A1A1A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                        Probate Club
                      </h3>
                      <p className="text-xs text-[#7F786A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                        Varsity and outerwear
                      </p>
                    </div>
                  </Link>

                  {/* Brand Card */}
                  <Link href="/brands" className="min-w-[12rem] sm:min-w-[14rem]">
                    <div className="aspect-square sm:aspect-[4/3] bg-gradient-to-br from-[#D0C7B7] via-[#E5E1DA] to-[#F5F2EB] border border-[#D4CFC3]"></div>
                    <div className="pt-4 space-y-1.5">
                      <h3 className="text-sm sm:text-base font-medium tracking-tight uppercase text-[#1A1A1A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                        Bruhz Archive
                      </h3>
                      <p className="text-xs text-[#7F786A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                        Tees and campus staples
                      </p>
                    </div>
                  </Link>

                  {/* Brand Card */}
                  <Link href="/brands" className="min-w-[12rem] sm:min-w-[14rem]">
                    <div className="aspect-square sm:aspect-[4/3] bg-gradient-to-br from-[#D6CEC1] via-[#E5E1DA] to-[#F5F2EB] border border-[#D4CFC3]"></div>
                    <div className="pt-4 space-y-1.5">
                      <h3 className="text-sm sm:text-base font-medium tracking-tight uppercase text-[#1A1A1A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                        Yard Runners
                      </h3>
                      <p className="text-xs text-[#7F786A]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                        Track and movement pieces
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
      </section>

      {/* Collections */}
      <section className="pb-12 sm:pb-16 lg:pb-20">
        <div className="flex flex-col gap-3 mb-8 sm:mb-10">
              <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                Collections
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Quiet capsules for the yard.
              </h2>
              <p className="text-sm sm:text-base text-[#4C4A45] max-w-xl" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                Curated edits of Que-owned pieces in muted tones and familiar silhouettes—built for everyday campus wear.
              </p>
            </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
              {/* Collection Card 1 */}
              <Link href="/collections" className="relative overflow-hidden border border-[#D4CFC3] bg-[#EDE7DE]">
                <div className="relative aspect-[16/9] sm:aspect-[4/3] bg-gradient-to-br from-[#D4CEC0] via-[#E5E1DA] to-[#F5F2EB]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#E5E1DA] via-transparent to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                    <div className="flex justify-between">
                      <span className="inline-flex items-center text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                        Bruhz picks
                      </span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                        Everyday yard
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4C4A45] max-w-sm" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                        Neutral sweats, tees, and outerwear that move easily from yard to city.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Collection Card 2 */}
              <Link href="/collections" className="relative overflow-hidden border border-[#D4CFC3] bg-[#EDE7DE]">
                <div className="relative aspect-[16/9] sm:aspect-[4/3] bg-gradient-to-br from-[#D8D1C5] via-[#E5E1DA] to-[#F5F2EB]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#E5E1DA] via-transparent to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                    <div className="flex justify-between">
                      <span className="inline-flex items-center text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                        Streetwear heat
                      </span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                        Graphics & layers
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4C4A45] max-w-sm" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                        Bold marks, clean shapes, and layered looks rooted in yard culture.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Collection Card 3 */}
              <Link href="/collections" className="relative overflow-hidden border border-[#D4CFC3] bg-[#EDE7DE]">
                <div className="relative aspect-[16/9] sm:aspect-[4/3] bg-gradient-to-br from-[#D0C7B7] via-[#E5E1DA] to-[#F5F2EB]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#E5E1DA] via-transparent to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                    <div className="flex justify-between">
                      <span className="inline-flex items-center text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                        Night games
                      </span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                        After-hours yard
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4C4A45] max-w-sm" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                        Dark tones, subtle details, and silhouettes cut for late-night runs.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
      </section>
    </div>
  )
}

