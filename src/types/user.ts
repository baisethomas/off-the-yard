import { Timestamp } from 'firebase-admin/firestore'

export interface User {
  uid: string
  email: string
  role: 'user' | 'seller' | 'admin'
  createdAt: Timestamp | Date
}

