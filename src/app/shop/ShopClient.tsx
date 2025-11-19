'use client'

import { useState, useMemo } from 'react'
import { ProductCard } from '@/components/ui/ProductCard'

interface Product {
  id: string
  title: string
  description?: string
  imageUrl: string
  externalUrl: string
  brandId?: string
  brandName?: string
  category?: string
  tags?: string[]
  dropNumber?: number | null
}

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc'

interface ShopClientProps {
  initialProducts: Product[]
}

export function ShopClient({ initialProducts }: ShopClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [showFilters, setShowFilters] = useState(false)

  // Extract unique categories and brands
  const categories = useMemo(() => {
    const cats = new Set<string>()
    initialProducts.forEach((p) => {
      if (p.category) cats.add(p.category)
    })
    return Array.from(cats).sort()
  }, [initialProducts])

  const brands = useMemo(() => {
    const brandSet = new Set<string>()
    initialProducts.forEach((p) => {
      if (p.brandName) brandSet.add(p.brandName)
    })
    return Array.from(brandSet).sort()
  }, [initialProducts])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.brandName?.toLowerCase().includes(query) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      filtered = filtered.filter((p) => p.brandName === selectedBrand)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return 0 // Already sorted by newest from API
        case 'oldest':
          return 0 // Would need createdAt in Product type
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    return filtered
  }, [initialProducts, searchQuery, selectedCategory, selectedBrand, sortBy])

  return (
    <div className="bg-[#E5E1DA] text-[#1A1A1A] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12 lg:py-16">
        {/* Header */}
        <section className="mb-8 sm:mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                SHOP
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1A1A] mt-2" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                All Products
              </h1>
              <p className="text-base sm:text-lg text-[#4C4A45] mt-2 max-w-2xl" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                Browse all Que-owned streetwear pieces. Filter by category, brand, or search for something specific.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
              <span className="inline-flex h-2 w-2 rounded-full bg-[#7F786A]"></span>
              <span>{filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}</span>
            </div>
          </div>
          <div className="h-px w-full bg-[#D4CFC3]"></div>
        </section>

        {/* Search and Filters */}
        <section className="mb-8 sm:mb-10 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products, brands, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-[#F5F2EB] text-[#1A1A1A] border border-[#D4CFC3] rounded-none focus:outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#7F786A]"
              style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7F786A] hover:text-[#1A1A1A] transition-colors"
                aria-label="Clear search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>

          {/* Filter Toggle (Mobile) */}
          <div className="flex items-center justify-between sm:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 rounded-none border border-[#D4CFC3] bg-[#EDE7DE] text-[0.7rem] tracking-[0.22em] uppercase text-[#1A1A1A] px-4 py-2 hover:bg-[#1A1A1A] hover:text-[#F5F2EB] transition-colors"
              style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
            >
              Filters
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 bg-[#F5F2EB] border border-[#D4CFC3] rounded-none text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
              style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="title-asc">A-Z</option>
              <option value="title-desc">Z-A</option>
            </select>
          </div>

          {/* Filters (Desktop & Mobile when open) */}
          <div className={`${showFilters ? 'block' : 'hidden'} sm:block space-y-4`}>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <span className="text-[0.65rem] tracking-[0.22em] uppercase text-[#7F786A] hidden sm:inline" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                  Category:
                </span>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`inline-flex items-center rounded-full border text-[0.7rem] sm:text-xs tracking-[0.22em] uppercase px-3 sm:px-4 py-1.5 transition-colors ${
                    selectedCategory === 'all'
                      ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#F5F2EB]'
                      : 'border-[#D4CFC3] bg-transparent text-[#4C4A45] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                  }`}
                  style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center rounded-full border text-[0.7rem] sm:text-xs tracking-[0.22em] uppercase px-3 sm:px-4 py-1.5 transition-colors capitalize ${
                      selectedCategory === cat
                        ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#F5F2EB]'
                        : 'border-[#D4CFC3] bg-transparent text-[#4C4A45] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                    }`}
                    style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Brand Filter */}
              {brands.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-[0.65rem] tracking-[0.22em] uppercase text-[#7F786A] hidden sm:inline" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                    Brand:
                  </span>
                  <button
                    onClick={() => setSelectedBrand('all')}
                    className={`inline-flex items-center rounded-full border text-[0.7rem] sm:text-xs tracking-[0.22em] uppercase px-3 sm:px-4 py-1.5 transition-colors ${
                      selectedBrand === 'all'
                        ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#F5F2EB]'
                        : 'border-[#D4CFC3] bg-transparent text-[#4C4A45] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                    }`}
                    style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                  >
                    All Brands
                  </button>
                  {brands.slice(0, 8).map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`inline-flex items-center rounded-full border text-[0.7rem] sm:text-xs tracking-[0.22em] uppercase px-3 sm:px-4 py-1.5 transition-colors ${
                        selectedBrand === brand
                          ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#F5F2EB]'
                          : 'border-[#D4CFC3] bg-transparent text-[#4C4A45] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                      }`}
                      style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort (Desktop) */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[0.65rem] tracking-[0.22em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 bg-[#F5F2EB] border border-[#D4CFC3] rounded-none text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
              </select>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <p className="text-base sm:text-lg text-[#4C4A45] mb-4" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                No products found matching your filters.
              </p>
              {(searchQuery || selectedCategory !== 'all' || selectedBrand !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setSelectedBrand('all')
                  }}
                  className="inline-flex items-center justify-center rounded-none border border-[#1A1A1A] bg-transparent text-[#1A1A1A] text-sm tracking-[0.22em] uppercase px-6 py-2.5 hover:bg-[#1A1A1A] hover:text-[#F5F2EB] transition-colors"
                  style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

