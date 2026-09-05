import Link from 'next/link'
import { Wordmark } from './Wordmark'
import { Monogram } from './Monogram'
import { LIVE_FORMATS } from '@/data/products'

const HOUSE = [
  { href: '/the-house', label: 'The House' },
  { href: '/discovery', label: 'Discovery' },
  { href: '/layering', label: 'Layering' },
  { href: '/bespoke', label: 'Bespoke' },
]

const CARE = [
  { href: '/shipping-returns', label: 'Shipping & Returns' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'Fragrance FAQ' },
  { href: '/wishlist', label: 'Wishlist' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-espresso text-ivory">
      {/* The monogram, oversized, as a watermark — the house signature. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-16 h-[26rem] w-[26rem] bg-contain bg-right-top bg-no-repeat opacity-[0.055] md:-right-10 md:h-[34rem] md:w-[34rem]"
        style={{ backgroundImage: 'url(/brand/monogram-ivory.png)' }}
      />

      <div className="shell relative py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Link href="/" aria-label="Ness — home" className="inline-block">
              <Wordmark tone="ivory" width={150} />
            </Link>
            <p className="lede mt-7 max-w-xs text-ivory/65">
              A house of scents. Fragrance made to be personal, expressive and
              actually wearable.
            </p>
          </div>

          <nav className="md:col-span-3" aria-labelledby="footer-shop">
            <h2 id="footer-shop" className="eyebrow text-ivory/60">
              Shop
            </h2>
            <ul className="mt-6 space-y-3.5">
              {LIVE_FORMATS.map((f) => (
                <li key={f.id}>
                  <Link
                    href={`/shop?format=${f.id}`}
                    className="link-quiet text-sm text-ivory/85"
                  >
                    {f.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-labelledby="footer-house">
            <h2 id="footer-house" className="eyebrow text-ivory/60">
              House
            </h2>
            <ul className="mt-6 space-y-3.5">
              {HOUSE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-quiet text-sm text-ivory/85">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-3" aria-labelledby="footer-care">
            <h2 id="footer-care" className="eyebrow text-ivory/60">
              Client Care
            </h2>
            <ul className="mt-6 space-y-3.5">
              {CARE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-quiet text-sm text-ivory/85">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="rule-inverse mt-20 flex flex-col items-center gap-8 border-t pt-10 md:flex-row md:justify-between">
          <Monogram tone="ivory" width={42} className="opacity-50" />
          <p className="eyebrow text-center text-ivory/60">
            © {new Date().getFullYear()} Ness · House of Scents
          </p>
          <p className="eyebrow text-ivory/60">Design prototype</p>
        </div>
      </div>
    </footer>
  )
}
