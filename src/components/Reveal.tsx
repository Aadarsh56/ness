'use client'

import { useEffect, useRef, useState, type ElementType } from 'react'

/**
 * Subtle rise-and-fade on first entry. Nothing moves twice, nothing moves far,
 * and it is disabled entirely under prefers-reduced-motion (handled in
 * globals.css so it degrades even before hydration).
 *
 * Content must never be left permanently invisible, so the observer is
 * deliberately forgiving: anything already in — or scrolled past — the
 * viewport reveals immediately. That covers deep links, restored scroll
 * positions on back-navigation, and flicks fast enough to outrun the
 * observer's callback.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  as?: ElementType
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShown(true)
      return
    }

    // Already on screen, or above it, at mount.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.94) {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            setShown(true)
            io.disconnect()
            return
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    )

    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  )
}
