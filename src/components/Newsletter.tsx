'use client'

import { useState } from 'react'

/**
 * No backend exists. The form validates and acknowledges locally, and says
 * so — it never implies an address has been stored anywhere.
 */
export function Newsletter({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const inverse = tone === 'dark'

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const value = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError('Please enter a valid email address.')
      return
    }
    setError(null)
    setDone(true)
  }

  const line = inverse ? 'border-ivory/30' : 'border-espresso/25'
  const text = inverse ? 'text-ivory' : 'text-espresso'
  const muted = inverse ? 'text-ivory/60' : 'text-rosewood'

  if (done) {
    return (
      <div className={`max-w-lg ${text}`} role="status">
        <p className="display-sm">Thank you.</p>
        <p className={`mt-3 text-sm ${muted}`}>
          You would be the first to know when the house opens. This prototype has
          no mailing list connected, so nothing has been stored.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-lg">
      <label htmlFor="newsletter-email" className={`eyebrow block ${muted}`}>
        Be first through the door
      </label>

      <div className={`mt-5 flex items-center gap-4 border-b pb-3 ${line}`}>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          autoComplete="email"
          aria-describedby={error ? 'newsletter-error' : undefined}
          aria-invalid={error ? true : undefined}
          className={`min-w-0 flex-1 bg-transparent py-1 text-sm outline-none placeholder:opacity-45 ${text}`}
        />
        <button
          type="submit"
          className={`eyebrow link-quiet shrink-0 ${text}`}
        >
          Sign up
        </button>
      </div>

      {error && (
        <p id="newsletter-error" role="alert" className={`mt-3 text-xs ${muted}`}>
          {error}
        </p>
      )}

      <p className={`mt-4 text-xs leading-relaxed ${muted}`}>
        Occasional letters on the collection and the house. No more than that.
      </p>
    </form>
  )
}
