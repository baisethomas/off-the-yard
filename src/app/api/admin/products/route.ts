import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebaseAdmin'
import { requireAdmin } from '@/lib/auth/serverAuth'
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
    
    const authHeader = req.headers.get('authorization')
    await requireAdmin(authHeader)

    const body = await req.json()

    const {
      id,
      brandId,
      title,
      description = '',
      imageUrl,
      externalUrl,
      category = 'apparel',
      tags = [],
      dropNumber = null,
      approved = true,
    } = body

    if (!brandId || !title || !imageUrl || !externalUrl) {
      return NextResponse.json(
        { error: 'brandId, title, imageUrl, and externalUrl are required' },
        { status: 400 }
      )
    }

    const productsRef = adminDb.collection('products')
    let docRef

    if (id) {
      docRef = productsRef.doc(id)
      await docRef.set(
        {
          brandId,
          title,
          description,
          imageUrl,
          externalUrl,
          category,
          tags,
          dropNumber,
          approved,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
    } else {
      docRef = productsRef.doc()
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
        approved,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })
    }

    return NextResponse.json({ id: docRef.id, success: true })
  } catch (err: any) {
    console.error('Admin products error', err)
    return NextResponse.json({ error: err.message ?? 'Server error' }, { status: 500 })
  }
}


