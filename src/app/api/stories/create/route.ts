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
      slug,
      title,
      dek = '',
      content,
      category = 'spotlight',
      heroImageUrl = '',
      authorName = 'Off the Yard',
    } = body

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: 'slug, title, and content are required' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingStory = await adminDb
      .collection('stories')
      .where('slug', '==', slug)
      .limit(1)
      .get()

    if (!existingStory.empty) {
      return NextResponse.json(
        { error: 'A story with this slug already exists' },
        { status: 400 }
      )
    }

    const storiesRef = adminDb.collection('stories')
    const docRef = storiesRef.doc()
    
    await docRef.set({
      id: docRef.id,
      slug,
      title,
      dek,
      content,
      category,
      heroImageUrl,
      authorName,
      approved: false, // Requires admin approval
      publishedAt: null, // Will be set when approved
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ id: docRef.id, success: true })
  } catch (err: any) {
    console.error('Create story error', err)
    
    if (err.message === 'Unauthorized' || err.message === 'Forbidden') {
      return NextResponse.json({ error: err.message }, { status: 401 })
    }
    
    return NextResponse.json({ error: err.message ?? 'Server error' }, { status: 500 })
  }
}

