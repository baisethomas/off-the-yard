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
      slug,
      title,
      dek = '',
      content,
      category = 'spotlight',
      heroImageUrl = '',
      authorName = 'Off the Yard',
      publishedAt, // optional; if missing, set now
    } = body

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: 'slug, title, and content are required' },
        { status: 400 }
      )
    }

    const storiesRef = adminDb.collection('stories')
    let docRef

    if (id) {
      docRef = storiesRef.doc(id)
      await docRef.set(
        {
          slug,
          title,
          dek,
          content,
          category,
          heroImageUrl,
          authorName,
          publishedAt: publishedAt
            ? new Date(publishedAt)
            : FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
    } else {
      docRef = storiesRef.doc()
      await docRef.set({
        id: docRef.id,
        slug,
        title,
        dek,
        content,
        category,
        heroImageUrl,
        authorName,
        publishedAt: publishedAt
          ? new Date(publishedAt)
          : FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })
    }

    return NextResponse.json({ id: docRef.id, success: true })
  } catch (err: any) {
    console.error('Admin stories error', err)
    return NextResponse.json({ error: err.message ?? 'Server error' }, { status: 500 })
  }
}


