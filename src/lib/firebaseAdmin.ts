import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getAuth, Auth } from 'firebase-admin/auth'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

let adminApp: App
let adminAuth: Auth
let adminDb: Firestore

if (getApps().length === 0) {
  // Initialize Firebase Admin SDK
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (projectId && clientEmail && privateKey) {
    adminApp = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      projectId,
    })
  } else {
    // Fallback: try to use default credentials (e.g., from service account JSON file)
    adminApp = initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'off-the-yard',
    })
  }

  adminAuth = getAuth(adminApp)
  adminDb = getFirestore(adminApp)
} else {
  adminApp = getApps()[0]
  adminAuth = getAuth(adminApp)
  adminDb = getFirestore(adminApp)
}

export { adminAuth, adminDb }

