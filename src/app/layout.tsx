import type { Metadata } from 'next'
import { Oswald, IBM_Plex_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  preload: false, // Disable preload for this font since it's not used immediately
})

export const metadata: Metadata = {
  title: 'Off the Yard – Underground Que-Owned Streetwear Marketplace',
  description: 'A quiet, considered edit of Que-owned streetwear and lifestyle pieces. Discover the brands, then link out to support the Bruhz directly.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${ibmPlexMono.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen bg-[#E5E1DA] text-[#1A1A1A] antialiased">
        <div className="flex flex-col min-h-screen">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

