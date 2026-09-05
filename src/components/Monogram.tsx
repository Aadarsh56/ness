import Image from 'next/image'

/**
 * The Ness monogram — an abstract N, not an infinity symbol.
 *
 * It is a standalone mark, NOT part of the logo: it sits beside or beneath
 * the lockup, never inside it. Use <Wordmark> for the logo itself.
 *
 * Rendered from the supplied brand artwork. The mark is never redrawn,
 * recoloured in CSS, or substituted; pick the supplied colourway instead.
 */

const SOURCES = {
  ivory: '/brand/monogram-ivory.png',
  ink: '/brand/monogram-ink.png',
  espresso: '/brand/monogram-espresso.png',
  burgundy: '/brand/monogram-burgundy.png',
} as const

export type MonogramTone = keyof typeof SOURCES

export function Monogram({
  tone = 'espresso',
  width = 44,
  className = '',
  priority = false,
}: {
  tone?: MonogramTone
  width?: number
  className?: string
  priority?: boolean
}) {
  // Native ratio of the extracted mark: 1560 × 972 (1.6:1).
  const height = Math.round((width / 1560) * 972)

  return (
    <Image
      src={SOURCES[tone]}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      priority={priority}
      className={className}
      sizes={`${width}px`}
    />
  )
}

/**
 * A full-bleed wash of the monogram texture tiles, for section grounds.
 * The parent must be `relative overflow-hidden`, and its content `relative`.
 */
export function MonogramWash({
  tone,
  opacity = 0.05,
}: {
  tone: 'ivory' | 'espresso' | 'burgundy' | 'rosewood' | 'black'
  opacity?: number
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(/brand/texture-${tone}.png)`, opacity }}
    />
  )
}

/**
 * A centred monogram flanked by hairlines — the house's section divider.
 * Used to punctuate the page the way a colophon punctuates a book.
 */
export function MonogramRule({
  tone = 'espresso',
  className = '',
}: {
  tone?: MonogramTone
  className?: string
}) {
  const line = tone === 'ivory' ? 'bg-ivory/25' : 'bg-espresso/15'

  return (
    <div className={`flex items-center justify-center gap-6 md:gap-10 ${className}`}>
      <span className={`h-px w-full max-w-40 ${line}`} aria-hidden="true" />
      <Monogram tone={tone} width={54} className="shrink-0 opacity-70" />
      <span className={`h-px w-full max-w-40 ${line}`} aria-hidden="true" />
    </div>
  )
}
