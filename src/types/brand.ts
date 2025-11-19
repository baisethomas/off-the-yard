import { Timestamp } from 'firebase-admin/firestore'

export interface Brand {
  id: string
  name: string
  bio: string
  chapter?: string
  verified: boolean
  heroImageUrl?: string
  logoUrl?: string
  ownerUid?: string | null
  socials?: {
    instagram?: string
    website?: string
    x?: string
  }
  createdAt?: Timestamp | Date
  updatedAt?: Timestamp | Date
}

