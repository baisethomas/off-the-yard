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
    const { id, approved = true } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Brand ID is required' },
        { status: 400 }
      )
    }

    const brandRef = adminDb.collection('brands').doc(id)
    await brandRef.update({
      approved,
      updatedAt: FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Approve brand error', err)
    return NextResponse.json({ error: err.message ?? 'Server error' }, { status: 500 })
  }
}

