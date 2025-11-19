import { adminAuth, adminDb } from '../firebaseAdmin'
import { cookies, headers } from 'next/headers'
import { User } from '@/types/user'
import { Timestamp } from 'firebase-admin/firestore'

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token)
    
    // Fetch user document from Firestore to get role
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get()
    const userData = userDoc.data()
    
    return {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
      role: (userData?.role as User['role']) || 'user',
      createdAt: userData?.createdAt || Timestamp.now(),
    }
  } catch (error) {
    console.error('Error verifying token:', error)
    return null
  }
}

export async function getServerUser(): Promise<User | null> {
  try {
    // Try to get token from Authorization header first (for API routes)
    const headersList = await headers()
    const authHeader = headersList.get('authorization')
    const tokenFromHeader = authHeader?.replace('Bearer ', '')

    // Fallback to cookies (for server components)
    const cookieStore = await cookies()
    const tokenFromCookie = cookieStore.get('auth-token')?.value

    const token = tokenFromHeader || tokenFromCookie

    if (!token) {
      return null
    }

    return await verifyToken(token)
  } catch (error) {
    console.error('Error getting server user:', error)
    return null
  }
}

export async function requireAuth(requiredRole?: User['role']): Promise<User> {
  const user = await getServerUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  if (requiredRole && user.role !== requiredRole) {
    throw new Error('Forbidden')
  }

  return user
}

export type AuthedAdminContext = {
  uid: string
  email?: string
}

export async function requireAdmin(authorizationHeader?: string | null): Promise<AuthedAdminContext> {
  if (!authorizationHeader?.startsWith('Bearer ')) {
    throw new Error('Missing or invalid Authorization header')
  }

  const idToken = authorizationHeader.split('Bearer ')[1]

  // Verify token with Firebase Admin
  const decoded = await adminAuth.verifyIdToken(idToken)

  const uid = decoded.uid

  // Fetch role from Firestore users collection
  const userSnap = await adminDb.collection('users').doc(uid).get()

  if (!userSnap.exists) {
    throw new Error('User not found')
  }

  const data = userSnap.data() as { role?: string; email?: string }

  if (data.role !== 'admin') {
    throw new Error('Not authorized')
  }

  return { uid, email: data.email }
}

