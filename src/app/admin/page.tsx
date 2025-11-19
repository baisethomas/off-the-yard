'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { getIdTokenOrThrow } from '@/lib/auth/clientToken'

type AdminFormState = 'idle' | 'submitting' | 'success' | 'error'

export default function AdminPage() {
  const { user, loading } = useAuth()
  const [brandStatus, setBrandStatus] = useState<AdminFormState>('idle')
  const [productStatus, setProductStatus] = useState<AdminFormState>('idle')
  const [storyStatus, setStoryStatus] = useState<AdminFormState>('idle')
  const [error, setError] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-[#F1EFEA] flex items-center justify-center">
        Loading…
      </div>
    )
  }

  // For now, naïve check: require a logged-in user. You can add role-check via /api/me later.
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-[#F1EFEA] flex items-center justify-center">
        <p>You must be signed in as an admin to view this page.</p>
      </div>
    )
  }

  const handleCreateBrand = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setBrandStatus('submitting')
      setError(null)

      const formData = new FormData(e.currentTarget)
      const token = await getIdTokenOrThrow()
      const payload = {
        name: formData.get('name'),
        bio: formData.get('bio'),
        chapter: formData.get('chapter'),
        verified: true,
        heroImageUrl: formData.get('heroImageUrl'),
        logoUrl: formData.get('logoUrl'),
        socials: {
          instagram: formData.get('instagram') || '',
          website: formData.get('website') || '',
          x: formData.get('x') || '',
        },
      }

      const res = await fetch('/api/admin/brands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || 'Failed to create brand')
      }

      setBrandStatus('success')
    } catch (err: any) {
      setBrandStatus('error')
      setError(err.message ?? 'Brand error')
    } finally {
      setTimeout(() => setBrandStatus('idle'), 2000)
    }
  }

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setProductStatus('submitting')
      setError(null)

      const formData = new FormData(e.currentTarget)
      const token = await getIdTokenOrThrow()
      const payload = {
        brandId: formData.get('brandId'),
        title: formData.get('title'),
        description: formData.get('description') || '',
        imageUrl: formData.get('imageUrl'),
        externalUrl: formData.get('externalUrl'),
        category: formData.get('category') || 'apparel',
        tags: (formData.get('tags') as string || '')
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        dropNumber: formData.get('dropNumber') || null,
        approved: true,
      }

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || 'Failed to create product')
      }

      setProductStatus('success')
    } catch (err: any) {
      setProductStatus('error')
      setError(err.message ?? 'Product error')
    } finally {
      setTimeout(() => setProductStatus('idle'), 2000)
    }
  }

  const handleCreateStory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setStoryStatus('submitting')
      setError(null)

      const formData = new FormData(e.currentTarget)
      const token = await getIdTokenOrThrow()
      const payload = {
        slug: formData.get('slug'),
        title: formData.get('title'),
        dek: formData.get('dek') || '',
        content: formData.get('content'),
        category: formData.get('category') || 'spotlight',
        heroImageUrl: formData.get('heroImageUrl') || '',
        authorName: formData.get('authorName') || 'Off the Yard',
      }

      const res = await fetch('/api/admin/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || 'Failed to create story')
      }

      setStoryStatus('success')
    } catch (err: any) {
      setStoryStatus('error')
      setError(err.message ?? 'Story error')
    } finally {
      setTimeout(() => setStoryStatus('idle'), 2000)
    }
  }

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-[#F1EFEA]">
      <div className="max-w-5xl mx-auto py-12 px-4 space-y-10">
        <header className="space-y-2">
          <div className="text-xs font-mono text-[#C4A46A]">OTY // ADMIN_CONSOLE</div>
          <h1 className="text-3xl tracking-[0.35em] uppercase">Off the Yard Admin</h1>
          <p className="text-sm text-[#F1EFEA]/70">
            Manage brands, products, and stories for the marketplace.
          </p>
          {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
        </header>

        {/* Create Brand */}
        <section className="bg-[#2B2B2D] border border-[#77736E] rounded-2xl p-6 space-y-4">
          <h2 className="text-lg uppercase tracking-[0.2em]">Create Brand</h2>
          <form
            onSubmit={handleCreateBrand}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
          >
            <input name="name" placeholder="Brand name" className="input-dark" />
            <input name="chapter" placeholder="Chapter (optional)" className="input-dark" />
            <input name="heroImageUrl" placeholder="Hero image URL" className="input-dark" />
            <input name="logoUrl" placeholder="Logo URL" className="input-dark" />
            <input name="instagram" placeholder="@instagram" className="input-dark" />
            <input name="website" placeholder="Website URL" className="input-dark" />
            <input name="x" placeholder="@X (Twitter)" className="input-dark" />
            <textarea
              name="bio"
              placeholder="Brand bio"
              className="input-dark md:col-span-2 min-h-[80px]"
            />
            <button
              className="md:col-span-2 mt-2 py-2 rounded-md bg-[#F1EFEA] text-[#0D0D0D] text-xs uppercase tracking-[0.2em]"
              disabled={brandStatus === 'submitting'}
            >
              {brandStatus === 'submitting'
                ? 'Saving...'
                : brandStatus === 'success'
                ? 'Saved!'
                : 'Save Brand'}
            </button>
          </form>
        </section>

        {/* Create Product */}
        <section className="bg-[#2B2B2D] border border-[#77736E] rounded-2xl p-6 space-y-4">
          <h2 className="text-lg uppercase tracking-[0.2em]">Create Product</h2>
          <form
            onSubmit={handleCreateProduct}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
          >
            <input name="brandId" placeholder="Brand ID" className="input-dark" />
            <input name="title" placeholder="Product title" className="input-dark" />
            <input name="imageUrl" placeholder="Product image URL" className="input-dark" />
            <input name="externalUrl" placeholder="External product URL" className="input-dark" />
            <input
              name="category"
              placeholder="Category (e.g., apparel)"
              className="input-dark"
            />
            <input
              name="dropNumber"
              placeholder="Drop number (e.g., DROP_014)"
              className="input-dark"
            />
            <input
              name="tags"
              placeholder="Tags (comma-separated)"
              className="input-dark md:col-span-2"
            />
            <textarea
              name="description"
              placeholder="Product description"
              className="input-dark md:col-span-2 min-h-[80px]"
            />
            <button
              className="md:col-span-2 mt-2 py-2 rounded-md bg-[#F1EFEA] text-[#0D0D0D] text-xs uppercase tracking-[0.2em]"
              disabled={productStatus === 'submitting'}
            >
              {productStatus === 'submitting'
                ? 'Saving...'
                : productStatus === 'success'
                ? 'Saved!'
                : 'Save Product'}
            </button>
          </form>
        </section>

        {/* Create Story */}
        <section className="bg-[#2B2B2D] border border-[#77736E] rounded-2xl p-6 space-y-4">
          <h2 className="text-lg uppercase tracking-[0.2em]">Create Story</h2>
          <form
            onSubmit={handleCreateStory}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
          >
            <input
              name="slug"
              placeholder="Slug (e.g. brand-interview)"
              className="input-dark"
            />
            <input name="title" placeholder="Story title" className="input-dark" />
            <input name="heroImageUrl" placeholder="Hero image URL" className="input-dark" />
            <input
              name="category"
              placeholder="Category (spotlight, interview, drop-recap)"
              className="input-dark"
            />
            <input name="authorName" placeholder="Author name" className="input-dark" />
            <input
              name="dek"
              placeholder="Short dek/subheadline"
              className="input-dark md:col-span-2"
            />
            <textarea
              name="content"
              placeholder="Story content"
              className="input-dark md:col-span-2 min-h-[160px]"
            />
            <button
              className="md:col-span-2 mt-2 py-2 rounded-md bg-[#F1EFEA] text-[#0D0D0D] text-xs uppercase tracking-[0.2em]"
              disabled={storyStatus === 'submitting'}
            >
              {storyStatus === 'submitting'
                ? 'Saving...'
                : storyStatus === 'success'
                ? 'Saved!'
                : 'Save Story'}
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}
