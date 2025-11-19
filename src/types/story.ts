import { Timestamp } from 'firebase-admin/firestore'

export type StoryCategory = 'spotlight' | 'interview' | 'drop-recap' | 'business' | 'brands'

export interface Story {
  id: string
  slug: string
  title: string
  dek?: string
  content: string
  category: StoryCategory
  heroImageUrl?: string
  authorName?: string
  publishedAt?: Timestamp | Date
  createdAt?: Timestamp | Date
  updatedAt?: Timestamp | Date
}

