import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getAuth, Auth } from 'firebase-admin/auth'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

let adminApp: App | null = null
let adminAuth: Auth | null = null
let adminDb: Firestore | null = null
let initializationAttempted = false
let initializationPromise: Promise<void> | null = null

async function initializeAdmin(): Promise<void> {
  // Only attempt initialization once
  if (initializationAttempted) {
    return
  }

  // If already initializing, wait for that to complete
  if (initializationPromise) {
    return initializationPromise
  }

  initializationAttempted = true

  initializationPromise = (async () => {
    try {
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
          console.warn('Firebase Admin credentials not found in environment')
          return
        }

        if (adminApp) {
          adminAuth = getAuth(adminApp)
          adminDb = getFirestore(adminApp)
        }
      } else {
        adminApp = getApps()[0]
        adminAuth = getAuth(adminApp)
        adminDb = getFirestore(adminApp)
      }
    } catch (error) {
      console.warn('Firebase Admin SDK initialization error:', error)
      // Allow the app to continue - admin features will be unavailable
      // but the app won't crash during startup
    }
  })()

  return initializationPromise
}

// Export async getters that lazily initialize
// These functions only initialize Firebase Admin when first called,
// preventing blocking during module import/compilation
export async function getAdminAuth(): Promise<Auth | null> {
  await initializeAdmin()
  return adminAuth
}

export async function getAdminDb(): Promise<Firestore | null> {
  await initializeAdmin()
  return adminDb
}

