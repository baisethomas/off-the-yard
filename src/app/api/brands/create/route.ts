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
      name,
      bio = '',
      chapter = '',
      heroImageUrl = '',
      logoUrl = '',
      socials = {},
    } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Brand name is required' },
        { status: 400 }
      )
    }

    const brandsRef = adminDb.collection('brands')
    const docRef = brandsRef.doc()
    
    await docRef.set({
      id: docRef.id,
      ownerUid: user.uid,
      name,
      bio,
      chapter,
      verified: false,
      approved: false, // Requires admin approval
      heroImageUrl,
      logoUrl,
      socials,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ id: docRef.id, success: true })
  } catch (err: any) {
    console.error('Create brand error', err)
    
    if (err.message === 'Unauthorized' || err.message === 'Forbidden') {
      return NextResponse.json({ error: err.message }, { status: 401 })
    }
    
    return NextResponse.json({ error: err.message ?? 'Server error' }, { status: 500 })
  }
}

