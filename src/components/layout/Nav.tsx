'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export function Nav() {
  const { user, loading, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30 border-b border-[#D4CFC3] bg-[#E5E1DA]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-6 py-4 px-4 sm:px-6 lg:px-0">
        {/* Wordmark */}
        <div className="flex items-center">
          <Link href="/" className="tracking-[0.32em] text-xs sm:text-sm font-medium text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            OFF THE YARD
          </Link>
        </div>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/collections" className="text-xs sm:text-sm font-normal tracking-tight text-[#3D3D3D] hover:text-[#1A1A1A] transition-colors" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
            Shop
          </Link>
          <Link href="/collections" className="sm:text-sm hover:text-[#1A1A1A] transition-colors cursor-pointer text-xs font-normal text-[#3D3D3D] tracking-tight" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
            Collections
          </Link>
          <Link href="/brands" className="sm:text-sm hover:text-[#1A1A1A] transition-colors text-xs font-normal text-[#3D3D3D] tracking-tight cursor-pointer" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
            Brands
          </Link>
          <Link href="/stories" className="text-xs sm:text-sm font-normal tracking-tight text-[#3D3D3D] hover:text-[#1A1A1A] transition-colors" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
            Stories
          </Link>
        </nav>

        {/* Utility Actions */}
        <div className="flex items-center gap-4">
          {loading ? (
            <span className="hidden sm:inline-flex text-xs sm:text-sm tracking-[0.22em] uppercase text-[#4C4A45]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              Loading...
            </span>
          ) : user ? (
            <>
              {user.role === 'seller' && (
                <Link href="/dashboard" className="hidden sm:inline-flex text-xs sm:text-sm tracking-[0.22em] uppercase text-[#4C4A45] hover:text-[#1A1A1A] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                  Dashboard
                </Link>
              )}
              {user.role === 'admin' && (
                <Link href="/admin" className="hidden sm:inline-flex text-xs sm:text-sm tracking-[0.22em] uppercase text-[#4C4A45] hover:text-[#1A1A1A] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="hidden sm:inline-flex text-xs sm:text-sm tracking-[0.22em] uppercase text-[#4C4A45] hover:text-[#1A1A1A] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
              >
                Sign out
              </button>
            </>
          ) : (
            <Link href="/auth" className="hidden sm:inline-flex text-xs sm:text-sm tracking-[0.22em] uppercase text-[#4C4A45] hover:text-[#1A1A1A] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              Sign in
            </Link>
          )}
          <Link href="/dashboard" className="inline-flex text-xs sm:text-sm tracking-[0.26em] uppercase text-[#1A1A1A] border border-[#C4B9A3] rounded-full py-2 px-4 hover:bg-[#1A1A1A] hover:text-[#F5F2EB] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
            For Sellers
          </Link>
        </div>
      </div>
    </header>
  )
}

