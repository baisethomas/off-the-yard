import { Timestamp } from 'firebase-admin/firestore'

export interface Product {
  id: string
  brandId: string
  title: string
  description: string
  imageUrl: string
  externalUrl: string
  category: string
  tags: string[]
  dropNumber?: string | null
  approved: boolean
  createdAt?: Timestamp | Date
  updatedAt?: Timestamp | Date
}

