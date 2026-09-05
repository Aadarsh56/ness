'use client'

import { useState } from 'react'
import { Monogram } from './Monogram'

/**
 * No backend. Validates locally and says plainly that nothing was submitted,
 * so the page never implies an enquiry has reached anyone.
 */
export function BespokeEnquiry() {
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const brief = String(data.get('brief') ?? '').trim()

    const next: Record<string, string> = {}
    if (!name) next.name = 'Please tell us what to call you.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = 'Please enter a valid email address.'
    if (brief.length < 12)
      next.brief = 'A sentence or two is enough, but we need something.'

    setErrors(next)
    if (Object.keys(next).length === 0) setSent(true)
  }

  if (sent) {
    return (
      <div className="rule border p-10 text-center" role="status">
        <Monogram tone="espresso" width={54} className="mx-auto opacity-35" />
        <p className="display-sm mt-7 text-espresso">Noted.</p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-rosewood">
          In the finished site this would reach the house. This is a design
          prototype with no backend connected, so nothing has been sent or
          stored.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rule border p-8 md:p-10">
      <div className="space-y-8">
        <Field
          id="name"
          label="Name"
          error={errors.name}
          input={
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className="w-full bg-transparent py-2 text-sm text-espresso outline-none"
            />
          }
        />

        <Field
          id="email"
          label="Email"
          error={errors.email}
          input={
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="w-full bg-transparent py-2 text-sm text-espresso outline-none"
            />
          }
        />

        <Field
          id="brief"
          label="What are you after?"
          error={errors.brief}
          input={
            <textarea
              id="brief"
              name="brief"
              rows={4}
              aria-invalid={errors.brief ? true : undefined}
              aria-describedby={errors.brief ? 'brief-error' : undefined}
              placeholder="A material, a place, a memory, an occasion — however roughly you can put it."
              className="w-full resize-none bg-transparent py-2 text-sm text-espresso outline-none placeholder:text-rosewood/70"
            />
          }
        />
      </div>

      <button type="submit" className="btn btn-solid mt-10 w-full">
        Register interest
      </button>

      <p className="mt-5 text-xs leading-relaxed text-rosewood">
        No fee, no deposit, no obligation. We will write when the house opens
        for commissions.
      </p>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  input,
}: {
  id: string
  label: string
  error?: string
  input: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block text-rosewood">
        {label}
      </label>
      <div
        className={`mt-3 border-b transition-colors duration-500 ${
          error ? 'border-burgundy' : 'rule'
        }`}
      >
        {input}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2.5 text-xs text-burgundy">
          {error}
        </p>
      )}
    </div>
  )
}
