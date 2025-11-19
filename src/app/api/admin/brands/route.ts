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
      id, // optional: for updates
      ownerUid, // optional; can be null for now
      name,
      bio,
      chapter,
      verified = true,
      heroImageUrl = '',
      logoUrl = '',
      socials = {},
    } = body

    if (!name) {
      return NextResponse.json({ error: 'Missing brand name' }, { status: 400 })
    }

    const brandsRef = adminDb.collection('brands')

    let docRef

    if (id) {
      // Update existing
      docRef = brandsRef.doc(id)
      await docRef.set(
        {
          ownerUid: ownerUid ?? null,
          name,
          bio: bio ?? '',
          chapter: chapter ?? '',
          verified,
          heroImageUrl,
          logoUrl,
          socials,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
    } else {
      // Create new
      docRef = brandsRef.doc()
      await docRef.set({
        id: docRef.id,
        ownerUid: ownerUid ?? null,
        name,
        bio: bio ?? '',
        chapter: chapter ?? '',
        verified,
        heroImageUrl,
        logoUrl,
        socials,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })
    }

    return NextResponse.json({ id: docRef.id, success: true })
  } catch (err: any) {
    console.error('Admin brands error', err)
    return NextResponse.json({ error: err.message ?? 'Server error' }, { status: 500 })
  }
}


