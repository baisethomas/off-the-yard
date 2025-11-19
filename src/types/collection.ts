import { Timestamp } from 'firebase-admin/firestore'

export interface Collection {
  id: string
  title: string
  description: string
  slug: string
  category?: string
  productIds?: string[]
  featured?: boolean
  imageUrl?: string
  createdAt?: Timestamp | Date
  updatedAt?: Timestamp | Date
}

