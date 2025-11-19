'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signIn, signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      if (isSignUp) {
        await signUp(email, password)
      } else {
        await signIn(email, password)
      }
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'Authentication failed')
    }
  }

  return (
    <div className="min-h-screen bg-[#E5E1DA] flex items-center justify-center px-4 py-12 sm:py-16">
      <div className="max-w-md w-full">
        <div className="bg-[#EDE7DE] border border-[#D4CFC3] p-8 sm:p-10 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <Link href="/" className="inline-block mb-4">
              <span className="tracking-[0.32em] text-xs sm:text-sm font-medium text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                OFF THE YARD
              </span>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </h1>
            <p className="text-sm text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
              {isSignUp ? 'Create an account to start selling' : 'Welcome back to Off the Yard'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm text-[#1A1A1A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#F5F2EB] text-[#1A1A1A] border border-[#D4CFC3] rounded-none focus:outline-none focus:border-[#1A1A1A] transition-colors"
                style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm text-[#1A1A1A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#F5F2EB] text-[#1A1A1A] border border-[#D4CFC3] rounded-none focus:outline-none focus:border-[#1A1A1A] transition-colors"
                style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#1A1A1A] text-[#F5F2EB] py-3 px-6 rounded-none border border-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] transition-colors text-sm tracking-[0.22em] uppercase"
              style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          {/* Toggle */}
          <div className="text-center pt-4 border-t border-[#D4CFC3]">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-[#4C4A45] hover:text-[#1A1A1A] transition-colors"
              style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
