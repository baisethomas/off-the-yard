import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[#3C3B38] bg-[#111111]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center sm:items-stretch justify-between gap-3 sm:gap-4 py-3 sm:py-3.5 px-4 sm:px-6 lg:px-0">
        {/* Left: Label */}
        <div className="flex items-center">
          <span className="text-[0.65rem] tracking-[0.28em] uppercase text-[#D5D3CC]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
            OFF_THE_YARD // UNDERGROUND MARKETPLACE
          </span>
        </div>

        {/* Right: Links + Copyright */}
        <div className="flex flex-col items-center sm:items-end gap-1 sm:gap-1.5">
          <nav className="flex items-center gap-4 sm:gap-5">
            <Link href="/about" className="text-[0.7rem] tracking-[0.18em] uppercase text-[#E5E1DA] hover:text-[#F5F2EB] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              About
            </Link>
            <Link href="/dashboard" className="text-[0.7rem] tracking-[0.18em] uppercase text-[#E5E1DA] hover:text-[#F5F2EB] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              For Sellers
            </Link>
            <Link href="/contact" className="text-[0.7rem] tracking-[0.18em] uppercase text-[#E5E1DA] hover:text-[#F5F2EB] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              Contact
            </Link>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[0.7rem] tracking-[0.18em] uppercase text-[#E5E1DA] hover:text-[#F5F2EB] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              Instagram
            </a>
          </nav>
          <p className="text-[0.6rem] tracking-[0.18em] uppercase text-[#6E6C66]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
            © {new Date().getFullYear()} Off the Yard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

