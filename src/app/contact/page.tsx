'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    // In a real app, you'd send this to an API endpoint
    // For now, we'll just simulate a submission
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1000)
  }

  return (
    <div className="bg-[#E5E1DA] text-[#1A1A1A] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12 lg:py-16">
        {/* Header */}
        <section className="mb-10 sm:mb-12 space-y-4">
          <span className="text-[0.7rem] tracking-[0.26em] uppercase text-[#7F786A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
            CONTACT
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-[#4C4A45]" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
            Have a question? Want to feature your brand? We'd love to hear from you.
          </p>
          <div className="h-px w-full bg-[#D4CFC3]"></div>
        </section>

        {/* Contact Form */}
        <section>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm text-[#1A1A1A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-[#F5F2EB] text-[#1A1A1A] border border-[#D4CFC3] rounded-none focus:outline-none focus:border-[#1A1A1A] transition-colors"
                  style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm text-[#1A1A1A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-[#F5F2EB] text-[#1A1A1A] border border-[#D4CFC3] rounded-none focus:outline-none focus:border-[#1A1A1A] transition-colors"
                  style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block mb-2 text-sm text-[#1A1A1A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="w-full px-4 py-3 bg-[#F5F2EB] text-[#1A1A1A] border border-[#D4CFC3] rounded-none focus:outline-none focus:border-[#1A1A1A] transition-colors"
                style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-sm text-[#1A1A1A]" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-3 bg-[#F5F2EB] text-[#1A1A1A] border border-[#D4CFC3] rounded-none focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none"
                style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}
              />
            </div>

            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 text-sm" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                Thank you for your message. We'll get back to you soon.
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 text-sm" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
                Something went wrong. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center justify-center rounded-none border border-[#1A1A1A] bg-[#1A1A1A] text-[#F5F2EB] text-sm font-normal tracking-[0.22em] uppercase py-3 px-8 hover:bg-transparent hover:text-[#1A1A1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {/* Alternative Contact */}
          <div className="mt-12 pt-8 border-t border-[#D4CFC3]">
            <p className="text-sm text-[#4C4A45] mb-4" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}>
              Or reach us directly:
            </p>
            <a
              href="mailto:hello@offtheyard.com"
              className="text-base text-[#1A1A1A] border-b border-[#1A1A1A] hover:border-transparent transition-colors"
              style={{ fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
            >
              hello@offtheyard.com
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

