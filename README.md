# Off the Yard

A curated underground marketplace for Que-owned streetwear brands.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, Framer Motion
- **Backend**: Firebase Auth, Firestore, Firebase Storage, Firebase Admin SDK
- **Hosting**: Vercel (Next.js), Firebase Storage

## Getting Started

### Prerequisites

- Node.js 18+ 
- Firebase project with Auth, Firestore, and Storage enabled
- Firebase Admin SDK service account credentials

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
# Firebase Client Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY=your_private_key
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/              # Next.js App Router pages
  components/       # React components
    ui/            # Reusable UI components
    layout/        # Layout components (Nav, Footer)
  lib/             # Utilities and configurations
    firebaseClient.ts
    firebaseAdmin.ts
    auth/
      serverAuth.ts
  hooks/           # React hooks
    useAuth.ts
  types/           # TypeScript type definitions
```

## Features

### Public Pages
- `/` - Homepage with hero, fresh drops, featured brands, collections
- `/brands` - Brands directory
- `/brands/[id]` - Individual brand storefront
- `/collections` - Collections index
- `/collections/[id]` - Collection detail
- `/stories` - Stories (editorial blog) index
- `/stories/[slug]` - Story detail page
- `/auth` - Authentication (sign in/sign up)

### Restricted Pages
- `/dashboard` - Seller dashboard (seller role only)
- `/admin` - Admin dashboard (admin role only)

## Authentication

The app uses Firebase Authentication with email/password. On sign-up, a user document is created in Firestore with role "user". Admins can manually promote users to "seller" or "admin" roles.

## Data Models

See `src/types/` for complete type definitions:
- `User` - User accounts with roles
- `Brand` - Brand/storefront information
- `Product` - Product listings (link-out to external URLs)
- `Story` - Editorial/blog content
- `Collection` - Curated product collections

## API Routes

- `POST /api/brands/create` - Create a new brand (seller only)
- `POST /api/products/create` - Create a new product (seller only)
- `POST /api/stories/create` - Create a new story (admin only)
- `POST /api/admin/approveBrand` - Approve/reject a brand (admin only)
- `POST /api/admin/approveProduct` - Approve/reject a product (admin only)

## Color Palette

- Charcoal Black: `#0D0D0D`
- Concrete Gray: `#2B2B2D`
- Bone: `#F1EFEA`
- Muted Gold: `#C4A46A`
- Bootprint Gray: `#77736E`

## Development Notes

This is the initial scaffolding phase. Pages contain placeholder content and components are basic implementations. Future iterations will add:

- Full UI designs matching the editorial streetwear aesthetic
- Image upload and Firebase Storage integration
- Product link-out functionality
- Search and filtering
- Rich text editor for stories
- Analytics and tracking

