import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Reveal } from '@/components/Reveal'
import { Flacon } from '@/components/Flacon'
import { ProductPurchase } from '@/components/ProductPurchase'
import { ProductCard } from '@/components/ProductCard'
import { Monogram } from '@/components/Monogram'
import {
  CURRENCY,
  PRODUCTS,
  fromPrice,
  getProduct,
  getFormat,
} from '@/data/products'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: 'Not found' }

  return {
    title: `${product.title} — ${product.reference}`,
    description: product.description.slice(0, 158),
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.title} — Ness`,
      description: product.tagline,
      type: 'website',
    },
  }
}

const TIERS = [
  { key: 'top', label: 'Top', note: 'The first ten minutes' },
  { key: 'heart', label: 'Heart', note: 'The hour after' },
  { key: 'base', label: 'Base', note: 'What stays' },
] as const

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const layers = product.layersWith
    .map((s) => getProduct(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  const price = fromPrice(product)
  const hasNotes =
    product.notes.top.length + product.notes.heart.length + product.notes.base.length >
    0

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-ivory pt-28 md:pt-32">
        <ol className="shell eyebrow flex items-center gap-2.5 text-rosewood">
          <li>
            <Link href="/" className="link-quiet">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/shop" className="link-quiet">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-espresso">
            {product.reference}
          </li>
        </ol>
      </nav>

      {/* Product */}
      <section className="bg-ivory pb-24 pt-8 md:pb-32 md:pt-10">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Imagery */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div
              className="relative flex aspect-4/5 w-full items-center justify-center overflow-hidden"
              style={{ backgroundColor: product.art.panel }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center opacity-[0.07]"
                style={{
                  backgroundImage: `url(/brand/${
                    product.art.onDark ? 'monogram-ivory' : 'monogram-espresso'
                  }.png)`,
                  backgroundSize: '70%',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <Flacon
                product={product}
                className="relative h-full w-full p-12 md:p-16"
              />
            </div>
            <p className="mt-4 text-xs text-rosewood">
              Placeholder rendering of the house flacon. Product photography to
              follow.
            </p>
          </div>

          {/* Detail */}
          <div>
            <Reveal>
              <p className="eyebrow text-rosewood">
                {product.reference} · {product.family} ·{' '}
                {getFormat(product.formats[0]).label}
              </p>
              <h1 className="display-lg mt-6 text-espresso">{product.title}</h1>
              <p className="lede mt-6 text-rosewood">{product.description}</p>
            </Reveal>

            <Reveal delay={90} className="rule mt-12 border-t pt-10">
              <ProductPurchase product={product} />
            </Reveal>

            {/* Notes pyramid */}
            {hasNotes && (
              <Reveal delay={120} className="rule mt-14 border-t pt-10">
                <h2 className="eyebrow text-rosewood">Fragrance notes</h2>
                <dl className="mt-8 space-y-7">
                  {TIERS.map((tier) => (
                    <div
                      key={tier.key}
                      className="rule-soft grid grid-cols-[7rem_1fr] gap-5 border-b pb-6 last:border-0"
                    >
                      <dt>
                        <span className="display-sm block text-espresso">
                          {tier.label}
                        </span>
                        <span className="eyebrow mt-1.5 block text-rosewood">
                          {tier.note}
                        </span>
                      </dt>
                      <dd className="text-sm leading-relaxed text-rosewood">
                        {product.notes[tier.key].join(' · ')}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}

            {/* Character */}
            <Reveal delay={140} className="rule mt-14 border-t pt-10">
              <h2 className="eyebrow text-rosewood">Character</h2>
              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-7">
                <div>
                  <dt className="eyebrow text-rosewood">Family</dt>
                  <dd className="display-sm mt-2 text-espresso">
                    {product.family}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-rosewood">Intensity</dt>
                  <dd className="mt-3 flex items-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        aria-hidden="true"
                        className={`h-1.5 w-7 ${
                          i < product.intensity
                            ? 'bg-espresso'
                            : 'bg-espresso/15'
                        }`}
                      />
                    ))}
                    <span className="sr-only">
                      {product.intensity} out of 5 within the house
                    </span>
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="eyebrow text-rosewood">Worn for</dt>
                  <dd className="mt-3 flex flex-wrap gap-2.5">
                    {product.mood.map((m) => (
                      <span
                        key={m}
                        className="rule border px-3.5 py-1.5 text-xs text-espresso"
                      >
                        {m}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>

            {/* Shipping & returns */}
            <Reveal delay={160} className="rule mt-14 border-t pt-10">
              <h2 className="eyebrow text-rosewood">Shipping &amp; returns</h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-rosewood">
                <p>
                  Shipping rates, delivery windows and the returns window are
                  not yet set. They will be published here before the house
                  opens.
                </p>
                <p>
                  Discovery sets and travel sizes are intended to be tried
                  before committing to a full bottle.
                </p>
                <Link href="/shipping-returns" className="link-quiet link-drawn inline-block text-espresso">
                  Read the full policy
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Layering suggestions */}
      {layers.length > 0 && (
        <section
          aria-labelledby="layers-heading"
          className="relative overflow-hidden bg-espresso py-24 text-ivory md:py-32"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 top-0 h-[30rem] w-[30rem] bg-contain bg-no-repeat opacity-[0.05]"
            style={{ backgroundImage: 'url(/brand/monogram-ivory.png)' }}
          />
          <div className="shell relative">
            <Reveal className="max-w-xl">
              <Monogram tone="ivory" width={50} className="opacity-45" />
              <p className="eyebrow mt-7 text-ivory/60">Wear it with</p>
              <h2 id="layers-heading" className="display-md mt-5 text-ivory">
                {product.reference} does not have to be worn alone
              </h2>
              <p className="lede mt-6 text-ivory/65">
                These two were composed to hold their shape next to it. Apply
                the heavier of the pair first.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-12 md:grid-cols-2 lg:max-w-3xl">
              {layers.map((p, i) => (
                <Reveal key={p.slug} delay={i * 120}>
                  <Link href={`/product/${p.slug}`} className="group block">
                    <div
                      className="aspect-4/5 overflow-hidden"
                      style={{ backgroundColor: p.art.panel }}
                    >
                      <Flacon
                        product={p}
                        className="h-full w-full p-10 transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                      />
                    </div>
                    <p className="eyebrow mt-5 text-ivory/60">{p.reference}</p>
                    <h3 className="display-sm mt-2.5 text-ivory">{p.title}</h3>
                    <p className="mt-2 text-sm text-ivory/60">{p.tagline}</p>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal delay={240} className="mt-14">
              <Link href="/layering" className="btn btn-inverse">
                The layering guide
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Continue browsing */}
      <section aria-labelledby="more-heading" className="bg-ivory py-24 md:py-32">
        <div className="shell">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 id="more-heading" className="display-md text-espresso">
              Continue through the house
            </h2>
            <Link href="/shop" className="eyebrow link-quiet link-drawn shrink-0 text-espresso">
              Shop all
            </Link>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 md:gap-x-8 lg:grid-cols-4">
            {PRODUCTS.filter((p) => p.slug !== product.slug)
              .slice(0, 4)
              .map((p, i) => (
                <Reveal key={p.slug} delay={i * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: `${product.title} — ${product.reference}`,
            sku: product.variants[0]?.sku,
            description: product.description,
            brand: { '@type': 'Brand', name: 'Ness' },
            category: `Fine Fragrance / ${product.family}`,
            ...(price !== null && {
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: CURRENCY.code,
                lowPrice: price,
                offerCount: product.variants.length,
                // Nothing can actually be purchased yet — never claim InStock.
                availability: 'https://schema.org/PreOrder',
              },
            }),
          }),
        }}
      />
    </>
  )
}
