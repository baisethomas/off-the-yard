# Firestore Security Rules Setup

## Problem
You're getting "Missing or insufficient permissions" errors when signing up because Firestore security rules haven't been deployed yet.

## Solution

You need to deploy the Firestore security rules to Firebase. Here are two ways to do it:

### Option 1: Deploy via Firebase Console (Recommended for Quick Setup)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **off-the-yard**
3. Navigate to **Firestore Database** → **Rules** tab
4. Copy the contents of `firestore.rules` file
5. Paste into the rules editor
6. Click **Publish**

### Option 2: Deploy via Firebase CLI

1. Install Firebase CLI (if not already installed):
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Deploy the rules:
```bash
firebase deploy --only firestore:rules
```

## What the Rules Do

The security rules allow:

✅ **Users Collection:**
- Authenticated users can create their own user document on sign-up
- Users can read any user document (for public profiles)
- Users can update their own document (but can't change their role)
- Admins can update any user document (including role changes)

✅ **Brands Collection:**
- Anyone can read verified brands
- Sellers can create brands (unverified initially)
- Sellers can update their own brands
- Admins can verify/update/delete any brand

✅ **Products Collection:**
- Anyone can read approved products
- Sellers can create products (unapproved initially)
- Sellers can update their own products
- Admins can approve/update/delete any product

✅ **Collections & Stories:**
- Public read access
- Only admins can create/update/delete

## Testing

After deploying the rules, try signing up again. The error should be resolved!

If you still get errors, check:
1. Rules were successfully deployed (check Firebase Console)
2. Your Firebase project ID matches in `.firebaserc`
3. Browser console for specific error messages

