import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal } from '@/components/Reveal'
import { ProductCard } from '@/components/ProductCard'
import { MonogramRule, MonogramWash } from '@/components/Monogram'
import {
  FORMATS,
  LIVE_FORMATS,
  getFormat,
  getProducts,
  type FormatId,
} from '@/data/products'

export const metadata: Metadata = {
  title: 'Shop Fine Fragrance',
  description:
    'The Ness collection — eau de parfum, travel sizes, discovery sets, body mists, perfume oils and layering pairs.',
  alternates: { canonical: '/shop' },
}

const LIVE_IDS = new Set<string>(LIVE_FORMATS.map((f) => f.id))

function isLiveFormat(value: string | undefined): value is FormatId {
  return typeof value === 'string' && LIVE_IDS.has(value)
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ format?: string }>
}) {
  const params = await searchParams
  const active: FormatId | 'all' = isLiveFormat(params.format)
    ? params.format
    : 'all'

  const products = getProducts(active)
  const activeDef = active === 'all' ? null : getFormat(active)
  const comingSoon = FORMATS.filter((f) => f.status === 'coming-soon')

  return (
    <>
      {/* Page header */}
      <section className="bg-ivory pt-36 md:pt-44">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-rosewood">Fine Fragrance</p>
            <h1 className="display-lg mt-6 max-w-[16ch] text-espresso">
              {activeDef ? activeDef.label : 'The Collection'}
            </h1>
            <p className="lede mt-7 max-w-xl text-rosewood">
              {activeDef
                ? activeDef.blurb
                : 'Eight compositions, five formats. Every one of them built to be layered with another.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter rail */}
      <section aria-label="Filter by format" className="sticky top-20 z-30 bg-ivory md:top-24">
        <div className="shell">
          <div className="rule flex items-center gap-7 overflow-x-auto border-y py-5 no-scrollbar">
            <FilterLink href="/shop" label="All" active={active === 'all'} />
            {LIVE_FORMATS.map((f) => (
              <FilterLink
                key={f.id}
                href={`/shop?format=${f.id}`}
                label={f.label}
                active={active === f.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-ivory pb-24 pt-14 md:pb-32 md:pt-20">
        <div className="shell">
          <p className="eyebrow text-rosewood" aria-live="polite">
            {products.length} {products.length === 1 ? 'piece' : 'pieces'}
          </p>

          {products.length === 0 ? (
            <p className="display-sm mt-12 text-rosewood">
              Nothing in this format yet.
            </p>
          ) : (
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-14 md:gap-x-8 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 4) * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Formats still in development — honestly labelled, not purchasable */}
      <section
        aria-labelledby="soon-heading"
        className="rule relative overflow-hidden border-t bg-ivory-deep py-20 md:py-28"
      >
        <MonogramWash tone="ivory" opacity={0.045} />
        <div className="shell relative">
          <MonogramRule className="mb-14" />
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="eyebrow text-rosewood">Not yet open</p>
            <h2 id="soon-heading" className="display-md mt-5 text-espresso">
              Formats in development
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-rosewood">
              These are planned for the house but are not available to buy. They
              are listed so you know where it is going, not to suggest you can
              have them yet.
            </p>
          </Reveal>

          <ul className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3">
            {comingSoon.map((f, i) => (
              <Reveal key={f.id} delay={(i % 3) * 70} as="li">
                <div className="rule-soft flex items-baseline justify-between border-b pb-4">
                  <span className="display-sm text-espresso/70">{f.label}</span>
                  <span className="eyebrow text-rosewood">Soon</span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200} className="mt-14 flex justify-center">
            <Link href="/bespoke" className="btn">
              Enquire about bespoke
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function FilterLink({
  href,
  label,
  active,
}: {
  href: string
  label: string
  active: boolean
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? 'true' : undefined}
      className={`eyebrow link-quiet shrink-0 whitespace-nowrap transition-opacity duration-500 ${
        active ? 'link-drawn text-espresso' : 'text-rosewood hover:text-espresso'
      }`}
    >
      {label}
    </Link>
  )
}
