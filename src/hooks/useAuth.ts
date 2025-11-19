'use client'

import { useEffect, useState } from 'react'
import { User as FirebaseUser, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebaseClient'
import { User } from '@/types/user'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser)
      
      if (firebaseUser) {
        // Set auth token in cookie for server-side access
        const token = await firebaseUser.getIdToken()
        document.cookie = `auth-token=${token}; path=/; max-age=3600; SameSite=Lax`
        
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (userDoc.exists()) {
          setUser(userDoc.data() as User)
        }
      } else {
        // Clear auth token cookie on logout
        document.cookie = 'auth-token=; path=/; max-age=0'
        setUser(null)
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const token = await userCredential.user.getIdToken()
    document.cookie = `auth-token=${token}; path=/; max-age=3600; SameSite=Lax`
    return userCredential
  }

  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const newUser: User = {
      uid: userCredential.user.uid,
      email: userCredential.user.email || '',
      role: 'user',
      createdAt: serverTimestamp() as any,
    }
    await setDoc(doc(db, 'users', userCredential.user.uid), newUser)
    const token = await userCredential.user.getIdToken()
    document.cookie = `auth-token=${token}; path=/; max-age=3600; SameSite=Lax`
    return userCredential
  }

  const logout = async () => {
    await signOut(auth)
    document.cookie = 'auth-token=; path=/; max-age=0'
    setUser(null)
  }

  return {
    user,
    firebaseUser,
    loading,
    signIn,
    signUp,
    logout,
  }
}

