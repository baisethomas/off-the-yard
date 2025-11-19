import { Timestamp } from 'firebase-admin/firestore'

export type UserRole = 'user' | 'seller' | 'admin'

export interface User {
  uid: string
  email: string
  role: UserRole
  createdAt: Timestamp | Date
}

