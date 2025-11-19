import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getAuth, Auth } from 'firebase-admin/auth'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

let adminApp: App | null = null
let adminAuth: Auth | null = null
let adminDb: Firestore | null = null

function initializeFirebaseAdmin() {
  console.log('[Firebase Admin] Starting initialization...')
  
  if (getApps().length > 0) {
    console.log('[Firebase Admin] App already initialized, reusing existing app')
    adminApp = getApps()[0]
    adminAuth = getAuth(adminApp)
    adminDb = getFirestore(adminApp)
    return
  }

  // Initialize Firebase Admin SDK
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  let privateKey = process.env.FIREBASE_PRIVATE_KEY
  
  console.log('[Firebase Admin] Environment check:')
  console.log('[Firebase Admin] - Project ID:', projectId ? '✓ Set' : '✗ Missing')
  console.log('[Firebase Admin] - Client Email:', clientEmail ? '✓ Set' : '✗ Missing')
  console.log('[Firebase Admin] - Private Key:', privateKey ? `✓ Set (${privateKey.length} chars)` : '✗ Missing')

  // Handle private key formatting - Vercel stores it with escaped newlines
  if (privateKey) {
    const originalLength = privateKey.length
    console.log('[Firebase Admin] Processing private key (original length:', originalLength, ')')
    
    // Trim whitespace
    privateKey = privateKey.trim()
    
    // Replace escaped newlines with actual newlines (handles Vercel's format)
    // This handles both \n (single escape) and \\n (double escape)
    privateKey = privateKey.replace(/\\n/g, '\n')
    privateKey = privateKey.replace(/\\\\n/g, '\n')
    
    // Remove any quotes that might wrap the key
    privateKey = privateKey.replace(/^["']|["']$/g, '')
    
    console.log('[Firebase Admin] After processing (new length:', privateKey.length, ')')
    
    // Ensure it starts and ends correctly
    if (!privateKey.startsWith('-----BEGIN')) {
      console.error('[Firebase Admin] Private key format is incorrect - missing BEGIN header')
      console.error('[Firebase Admin] Private key starts with:', privateKey.substring(0, 50))
    }
    
    if (!privateKey.endsWith('-----END PRIVATE KEY-----')) {
      // Try to fix if it's missing the newline before END
      if (privateKey.includes('-----END PRIVATE KEY-----')) {
        privateKey = privateKey.replace('-----END PRIVATE KEY-----', '\n-----END PRIVATE KEY-----\n')
      } else {
        console.error('[Firebase Admin] Private key format is incorrect - missing END footer')
      }
    }
  }

  if (projectId && clientEmail && privateKey) {
    // Validate private key format before attempting initialization
    const hasBeginHeader = privateKey.includes('-----BEGIN PRIVATE KEY-----')
    const hasEndFooter = privateKey.includes('-----END PRIVATE KEY-----')
    const keyLength = privateKey.length
    
    console.log('[Firebase Admin] Validating private key format...')
    console.log('[Firebase Admin] Has BEGIN header:', hasBeginHeader)
    console.log('[Firebase Admin] Has END footer:', hasEndFooter)
    console.log('[Firebase Admin] Key length:', keyLength)
    console.log('[Firebase Admin] First 50 chars:', privateKey.substring(0, 50))
    console.log('[Firebase Admin] Last 50 chars:', privateKey.substring(Math.max(0, keyLength - 50)))
    
    if (!hasBeginHeader || !hasEndFooter) {
      console.error('[Firebase Admin] Private key format validation failed!')
      console.error('[Firebase Admin] Key must start with "-----BEGIN PRIVATE KEY-----" and end with "-----END PRIVATE KEY-----"')
    }
    
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
      console.log('[Firebase Admin] ✓ Initialized successfully with environment variables')
    } catch (error: any) {
      console.error('[Firebase Admin] ✗ Failed to initialize with cert:', error.message)
      console.error('[Firebase Admin] Error code:', error.code)
      console.error('[Firebase Admin] Error details:', error.details)
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

