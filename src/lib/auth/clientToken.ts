'use client'

import { auth } from '@/lib/firebaseClient'

export async function getIdTokenOrThrow(): Promise<string> {
  const user = auth.currentUser
  if (!user) throw new Error('Not signed in')
  return user.getIdToken()
}


