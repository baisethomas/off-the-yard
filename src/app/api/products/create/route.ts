import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebaseAdmin'
import { requireAuth } from '@/lib/auth/serverAuth'
import { FieldValue } from 'firebase-admin/firestore'

export async function POST(req: NextRequest) {
  try {
    const adminDb = await getAdminDb()
    
    if (!adminDb) {
      return NextResponse.json(
        { error: 'Firebase Admin not initialized' },
        { status: 503 }
      )
    }
    
    // Require authenticated user
    const user = await requireAuth()

    const body = await req.json()

    const {
      brandId,
      title,
      description = '',
      imageUrl,
      externalUrl,
      category = 'apparel',
      tags = [],
      dropNumber = null,
    } = body

    if (!brandId || !title || !imageUrl || !externalUrl) {
      return NextResponse.json(
        { error: 'brandId, title, imageUrl, and externalUrl are required' },
        { status: 400 }
      )
    }

    // Verify user owns the brand
    const brandDoc = await adminDb.collection('brands').doc(brandId).get()
    if (!brandDoc.exists) {
      return NextResponse.json(
        { error: 'Brand not found' },
        { status: 404 }
      )
    }

    const brandData = brandDoc.data()
    if (brandData?.ownerUid !== user.uid) {
      return NextResponse.json(
        { error: 'You do not have permission to add products to this brand' },
        { status: 403 }
      )
    }

    const productsRef = adminDb.collection('products')
    const docRef = productsRef.doc()
    
    await docRef.set({
      id: docRef.id,
      brandId,
      title,
      description,
      imageUrl,
      externalUrl,
      category,
      tags,
      dropNumber,
      approved: false, // Requires admin approval
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ id: docRef.id, success: true })
  } catch (err: any) {
    console.error('Create product error', err)
    
    if (err.message === 'Unauthorized' || err.message === 'Forbidden') {
      return NextResponse.json({ error: err.message }, { status: 401 })
    }
    
    return NextResponse.json({ error: err.message ?? 'Server error' }, { status: 500 })
  }
}

