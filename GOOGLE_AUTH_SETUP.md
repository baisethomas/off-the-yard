# Google Authentication Setup

## Enable Google Sign-In in Firebase Console

To enable Google authentication, you need to configure it in Firebase Console:

### Steps:

1. **Go to Firebase Console**
   - Navigate to [Firebase Console](https://console.firebase.google.com/)
   - Select your project: **off-the-yard**

2. **Enable Google Authentication**
   - Go to **Authentication** → **Sign-in method** tab
   - Click on **Google** provider
   - Toggle **Enable** to ON
   - Enter your **Project support email** (your email)
   - Click **Save**

3. **Configure Authorized Domains (if needed)**
   - In the same **Sign-in method** page
   - Scroll to **Authorized domains**
   - Make sure your domain is listed (localhost is included by default for development)
   - For production, add your domain (e.g., `off-the-yard.com`)

4. **Test Google Sign-In**
   - Visit `/auth` page in your app
   - Click "Continue with Google"
   - You should see Google's sign-in popup
   - After signing in, a user document will be automatically created in Firestore

## How It Works

- When a user clicks "Continue with Google", they're redirected to Google's sign-in page
- After successful authentication, Firebase creates an auth user
- The app automatically creates a Firestore user document with role "user"
- The user is redirected to the homepage

## Security

- Google authentication uses OAuth 2.0
- User tokens are securely stored in cookies for server-side access
- Firestore security rules ensure users can only create their own user documents

## Troubleshooting

If Google sign-in doesn't work:

1. **Check Firebase Console**
   - Verify Google provider is enabled
   - Check that your domain is authorized

2. **Check Browser Console**
   - Look for any error messages
   - Common issues:
     - Popup blocked (allow popups for your domain)
     - Domain not authorized (add domain in Firebase Console)

3. **Check Network Tab**
   - Verify requests to Google OAuth endpoints are successful

4. **Verify Environment Variables**
   - Make sure `NEXT_PUBLIC_FIREBASE_API_KEY` is set correctly in `.env.local`

