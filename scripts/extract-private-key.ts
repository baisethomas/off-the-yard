import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const serviceAccountPath = path.join(__dirname, '..', 'off-the-yard-firebase-adminsdk-fbsvc-d7fadb40f7.json')

if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))
  const privateKey = serviceAccount.private_key
  
  console.log('\n=== FIREBASE PRIVATE KEY (Copy this entire block) ===\n')
  console.log(privateKey)
  console.log('\n=== END OF PRIVATE KEY ===\n')
  console.log('Instructions:')
  console.log('1. Copy the entire block above (from -----BEGIN to -----END)')
  console.log('2. Go to Vercel → Settings → Environment Variables')
  console.log('3. Paste it into FIREBASE_PRIVATE_KEY')
  console.log('4. Make sure it includes the actual newlines (not \\n text)')
  console.log('5. Save and redeploy\n')
} else {
  console.error('Service account file not found at:', serviceAccountPath)
}

