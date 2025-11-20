import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

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
    <html lang="en">
      <body className="min-h-screen bg-[#E5E1DA] text-[#1A1A1A] antialiased" style={{ fontFamily: 'system-ui, sans-serif' }}>
        <div className="flex flex-col min-h-screen">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
