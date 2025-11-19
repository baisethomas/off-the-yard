import { Timestamp } from 'firebase-admin/firestore'

export interface Collection {
  id: string
  slug: string
  title: string
  description?: string
  heroImageUrl?: string
  createdAt?: Timestamp | Date
  updatedAt?: Timestamp | Date
}

