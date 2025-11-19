'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useState, useEffect } from 'react'

export function Nav() {
  const { user, loading, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      
      // Close menu on Escape key press
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false)
        }
      }
      document.addEventListener('keydown', handleEscape)
      
      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', handleEscape)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    closeMobileMenu()
  }

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[#D4CFC3] bg-[#E5E1DA]/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6 py-4 px-4 sm:px-6 lg:px-0">
          {/* Wordmark */}
          <div className="flex items-center">
            <Link href="/" className="tracking-[0.32em] text-xs sm:text-sm font-medium text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              OFF THE YARD
            </Link>
          </div>

          {/* Center Nav - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-xs sm:text-sm font-normal tracking-tight text-[#3D3D3D] hover:text-[#1A1A1A] transition-colors" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
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
          <div className="flex items-center gap-3 sm:gap-4">
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
            <Link href="/dashboard" className="hidden sm:inline-flex text-xs sm:text-sm tracking-[0.26em] uppercase text-[#1A1A1A] border border-[#C4B9A3] rounded-full py-2 px-4 hover:bg-[#1A1A1A] hover:text-[#F5F2EB] transition-colors" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              For Sellers
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <span
                className={`block h-0.5 w-6 bg-[#1A1A1A] transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[#1A1A1A] transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[#1A1A1A] transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
            onClick={closeMobileMenu}
          />
          
          {/* Mobile Menu Drawer */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#E5E1DA] border-l border-[#D4CFC3] z-50 md:hidden shadow-2xl transform transition-transform duration-300 ease-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#D4CFC3]">
                <span className="tracking-[0.32em] text-sm font-medium text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                  MENU
                </span>
                <button
                  onClick={closeMobileMenu}
                  className="w-8 h-8 flex items-center justify-center focus:outline-none"
                  aria-label="Close menu"
                >
                  <span className="block h-0.5 w-5 bg-[#1A1A1A] rotate-45" />
                  <span className="block h-0.5 w-5 bg-[#1A1A1A] -rotate-45 absolute" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-6">
                <div className="flex flex-col">
                  <Link
                    href="/shop"
                    onClick={closeMobileMenu}
                    className="px-6 py-4 text-base font-normal tracking-tight text-[#3D3D3D] hover:text-[#1A1A1A] hover:bg-[#EDE7DE] transition-colors border-b border-[#D4CFC3]"
                    style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}
                  >
                    Shop
                  </Link>
                  <Link
                    href="/collections"
                    onClick={closeMobileMenu}
                    className="px-6 py-4 text-base font-normal tracking-tight text-[#3D3D3D] hover:text-[#1A1A1A] hover:bg-[#EDE7DE] transition-colors border-b border-[#D4CFC3]"
                    style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}
                  >
                    Collections
                  </Link>
                  <Link
                    href="/brands"
                    onClick={closeMobileMenu}
                    className="px-6 py-4 text-base font-normal tracking-tight text-[#3D3D3D] hover:text-[#1A1A1A] hover:bg-[#EDE7DE] transition-colors border-b border-[#D4CFC3]"
                    style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}
                  >
                    Brands
                  </Link>
                  <Link
                    href="/stories"
                    onClick={closeMobileMenu}
                    className="px-6 py-4 text-base font-normal tracking-tight text-[#3D3D3D] hover:text-[#1A1A1A] hover:bg-[#EDE7DE] transition-colors border-b border-[#D4CFC3]"
                    style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}
                  >
                    Stories
                  </Link>
                </div>
              </nav>

              {/* User Actions */}
              <div className="border-t border-[#D4CFC3] p-6 space-y-4">
                {loading ? (
                  <div className="text-xs tracking-[0.22em] uppercase text-[#4C4A45]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                    Loading...
                  </div>
                ) : user ? (
                  <>
                    {user.role === 'seller' && (
                      <Link
                        href="/dashboard"
                        onClick={closeMobileMenu}
                        className="block text-xs tracking-[0.22em] uppercase text-[#4C4A45] hover:text-[#1A1A1A] transition-colors py-2"
                        style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                      >
                        Dashboard
                      </Link>
                    )}
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={closeMobileMenu}
                        className="block text-xs tracking-[0.22em] uppercase text-[#4C4A45] hover:text-[#1A1A1A] transition-colors py-2"
                        style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                      >
                        Admin
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-xs tracking-[0.22em] uppercase text-[#4C4A45] hover:text-[#1A1A1A] transition-colors py-2"
                      style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth"
                    onClick={closeMobileMenu}
                    className="block text-xs tracking-[0.22em] uppercase text-[#4C4A45] hover:text-[#1A1A1A] transition-colors py-2"
                    style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                  >
                    Sign in
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className="block w-full text-center text-xs tracking-[0.26em] uppercase text-[#1A1A1A] border border-[#C4B9A3] rounded-full py-2.5 px-4 hover:bg-[#1A1A1A] hover:text-[#F5F2EB] transition-colors mt-4"
                  style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                >
                  For Sellers
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

