import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth/serverAuth'

export default async function DashboardPage() {
  let user
  try {
    user = await requireAuth('seller')
  } catch {
    redirect('/auth')
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">Seller Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Stats Cards */}
          <div className="bg-concrete p-6">
            <h2 className="text-2xl font-bold mb-2">My Brands</h2>
            <p className="text-4xl font-bold text-gold">0</p>
          </div>
          <div className="bg-concrete p-6">
            <h2 className="text-2xl font-bold mb-2">My Products</h2>
            <p className="text-4xl font-bold text-gold">0</p>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Quick Actions</h2>
          <div className="flex gap-4">
            <button className="bg-gold text-charcoal px-6 py-3 rounded font-bold">
              Create Brand
            </button>
            <button className="bg-gold text-charcoal px-6 py-3 rounded font-bold">
              Add Product
            </button>
          </div>
        </section>

        {/* My Brands Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">My Brands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-concrete p-6">Brand Card Placeholder</div>
            <div className="bg-concrete p-6">Brand Card Placeholder</div>
          </div>
        </section>

        {/* My Products Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">My Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-concrete p-6">Product Card Placeholder</div>
            <div className="bg-concrete p-6">Product Card Placeholder</div>
          </div>
        </section>
      </div>
    </div>
  )
}

