import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getAuth, Auth } from 'firebase-admin/auth'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

let adminApp: App | null = null
let adminAuth: Auth | null = null
let adminDb: Firestore | null = null

function initializeFirebaseAdmin() {
  if (getApps().length > 0) {
    adminApp = getApps()[0]
    adminAuth = getAuth(adminApp)
    adminDb = getFirestore(adminApp)
    return
  }

  // Initialize Firebase Admin SDK
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  let privateKey = process.env.FIREBASE_PRIVATE_KEY

  // Handle private key formatting - Vercel stores it with escaped newlines
  if (privateKey) {
    // Replace escaped newlines with actual newlines
    privateKey = privateKey.replace(/\\n/g, '\n')
    // Also handle double-escaped newlines (sometimes happens)
    privateKey = privateKey.replace(/\\\\n/g, '\n')
    // Ensure it starts and ends correctly
    if (!privateKey.startsWith('-----BEGIN')) {
      // If it's missing the header, it might be base64 encoded or malformed
      console.warn('[Firebase Admin] Private key format may be incorrect')
    }
  }

  if (projectId && clientEmail && privateKey) {
    try {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        projectId,
      })
      adminAuth = getAuth(adminApp)
      adminDb = getFirestore(adminApp)
      console.log('[Firebase Admin] Initialized successfully with environment variables')
    } catch (error: any) {
      console.error('[Firebase Admin] Failed to initialize with cert:', error.message)
      // Fallback to default credentials
      try {
        adminApp = initializeApp({
          projectId: projectId || 'off-the-yard',
        })
        adminAuth = getAuth(adminApp)
        adminDb = getFirestore(adminApp)
        console.log('[Firebase Admin] Initialized with default credentials (may have limited access)')
      } catch (fallbackError: any) {
        console.error('[Firebase Admin] Failed to initialize:', fallbackError.message)
      }
    }
  } else {
    // Fallback: try to use default credentials (e.g., from service account JSON file or Application Default Credentials)
    try {
      adminApp = initializeApp({
        projectId: projectId || 'off-the-yard',
      })
      adminAuth = getAuth(adminApp)
      adminDb = getFirestore(adminApp)
      console.log('[Firebase Admin] Initialized with default credentials')
    } catch (error: any) {
      console.error('[Firebase Admin] Failed to initialize:', error.message)
    }
  }
}

// Initialize on module load
initializeFirebaseAdmin()

export { adminAuth, adminDb }

export async function getAdminDb(): Promise<Firestore | null> {
  if (!adminDb) {
    initializeFirebaseAdmin()
  }
  return adminDb || null
}

