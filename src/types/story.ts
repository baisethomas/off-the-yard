import { Timestamp } from 'firebase-admin/firestore'

export interface Story {
  id: string
  slug: string
  title: string
  dek?: string
  content: string
  category?: string
  heroImageUrl?: string
  authorName?: string
  publishedAt?: Timestamp | Date | null
  approved?: boolean
  createdAt?: Timestamp | Date
  updatedAt?: Timestamp | Date
}

