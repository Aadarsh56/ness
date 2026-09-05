import Image from 'next/image'

/**
 * The Ness lockup: the "Ness" wordmark with "HOUSE OF SCENTS" set beneath it.
 * The monogram is a separate mark and is NOT part of the logo — use
 * <Monogram> for that.
 *
 * Extracted from the supplied brand lockup with its flat background keyed
 * out; the artwork itself is untouched.
 */

const SOURCES = {
  espresso: '/brand/wordmark-espresso.png',
  ivory: '/brand/wordmark-ivory.png',
  ink: '/brand/wordmark-ink.png',
  burgundy: '/brand/wordmark-burgundy.png',
} as const

export type WordmarkTone = keyof typeof SOURCES

export function Wordmark({
  tone = 'espresso',
  width = 132,
  className = '',
  priority = false,
}: {
  tone?: WordmarkTone
  width?: number
  className?: string
  priority?: boolean
}) {
  // Native ratio of the extracted lockup: 1008 × 556.
  const height = Math.round((width / 1008) * 556)

  return (
    <Image
      src={SOURCES[tone]}
      alt="Ness — House of Scents"
      width={width}
      height={height}
      priority={priority}
      className={className}
      sizes={`${width}px`}
    />
  )
}
