import Link from 'next/link'
import Image from 'next/image'
import { Reveal } from '@/components/Reveal'
import { Flacon } from '@/components/Flacon'
import { ProductCard } from '@/components/ProductCard'
import { Monogram, MonogramRule, MonogramWash } from '@/components/Monogram'
import { Newsletter } from '@/components/Newsletter'
import {
  getFeatured,
  getFragrances,
  getProduct,
  LAYERING_PAIRS,
} from '@/data/products'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Featured />
      <Explore />
      <Discovery />
      <Layering />
      <Story />
      <FinalCta />
    </>
  )
}

/* -------------------------------------------------------------------- hero */

function Hero() {
  const featured = getFeatured()

  return (
    <section className="relative bg-ivory pt-20 md:pt-24">
      <div className="grid items-stretch lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center px-6 py-20 md:px-12 md:py-28 lg:min-h-[calc(100vh-6rem)] lg:px-20 xl:pl-28">
          <Reveal>
            <p className="eyebrow flex items-center gap-4 text-rosewood">
              <span className="h-px w-10 bg-rosewood/40" aria-hidden="true" />
              Fine Fragrance · First Collection
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="display-xl mt-9 max-w-[13ch] text-espresso">
              House of Scents
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="lede mt-9 max-w-md text-rosewood">
              Ness composes fragrance to be worn close and made personal
              — layered, combined, and eventually unrecognisable as anyone
              else&rsquo;s.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link href="/shop" className="btn btn-solid">
                Explore fragrances
              </Link>
              <Link href="/discovery" className="btn">
                Find your scent
              </Link>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <dl className="rule mt-16 grid max-w-lg grid-cols-3 border-t pt-8">
              {[
                ['Eight', 'compositions'],
                ['Five', 'formats'],
                ['One', 'signature'],
              ].map(([big, small]) => (
                <div key={small}>
                  <dt className="display-sm text-espresso">{big}</dt>
                  <dd className="eyebrow mt-2 text-rosewood">{small}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="relative flex min-h-[26rem] items-center justify-center overflow-hidden bg-burgundy lg:min-h-[calc(100vh-6rem)]">
          <MonogramWash tone="burgundy" opacity={0.14} />
          <Reveal delay={200} className="relative w-full max-w-md px-10">
            <Flacon product={featured} className="h-auto w-full drop-shadow-2xl" />
          </Reveal>

          <div className="absolute bottom-8 left-0 right-0 flex justify-center px-6">
            <Reveal delay={420}>
              <p className="eyebrow text-center text-ivory/70">
                {featured.reference} · {featured.accord.join(' · ')}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- featured */

function Featured() {
  const featured = getFeatured()

  return (
    <section
      aria-labelledby="featured-heading"
      className="relative overflow-hidden bg-espresso text-ivory"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 h-[40rem] w-[40rem] -translate-y-1/2 bg-contain bg-no-repeat opacity-[0.05]"
        style={{ backgroundImage: 'url(/brand/monogram-ivory.png)' }}
      />

      <div className="shell relative grid items-center gap-16 py-24 md:py-32 lg:grid-cols-2 lg:gap-24">
        <Reveal className="order-2 lg:order-1">
          <p className="eyebrow text-ivory/60">The composition in focus</p>
          <h2 id="featured-heading" className="display-lg mt-7 text-ivory">
            {featured.title}
          </h2>
          <p className="lede mt-7 max-w-lg text-ivory/70">
            {featured.description}
          </p>

          <dl className="rule-inverse mt-12 grid max-w-lg grid-cols-3 gap-8 border-t pt-8">
            {(['top', 'heart', 'base'] as const).map((tier) => (
              <div key={tier}>
                <dt className="eyebrow text-ivory/60">{tier}</dt>
                <dd className="mt-3 space-y-1.5 text-sm text-ivory/85">
                  {featured.notes[tier].map((n) => (
                    <span key={n} className="block">
                      {n}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-wrap items-center gap-8">
            <Link href={`/product/${featured.slug}`} className="btn btn-inverse">
              View {featured.reference}
            </Link>
            <Link href="/shop" className="eyebrow link-quiet link-drawn text-ivory/75">
              All fragrances
            </Link>
          </div>
        </Reveal>

        <Reveal delay={140} className="order-1 flex justify-center lg:order-2">
          <div className="w-full max-w-sm">
            <Flacon product={featured} className="h-auto w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- explore */

function Explore() {
  const fragrances = getFragrances()

  return (
    <section aria-labelledby="explore-heading" className="bg-ivory py-24 md:py-32">
      <div className="shell">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-rosewood">The collection</p>
            <h2
              id="explore-heading"
              className="display-lg mt-6 max-w-[14ch] text-espresso"
            >
              Eight ways to be recognised
            </h2>
          </div>
          <Link
            href="/shop"
            className="eyebrow link-quiet link-drawn shrink-0 text-espresso"
          >
            Shop all
          </Link>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 md:mt-20 md:gap-x-8 lg:grid-cols-4">
          {fragrances.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- discovery */

const DISCOVERY_STEPS = [
  {
    n: '01',
    t: 'Answer six questions',
    d: 'About warmth, weather, and how close you want to be stood next to. Nothing about your gender.',
  },
  {
    n: '02',
    t: 'Receive three compositions',
    d: 'Ranked, with the reasoning shown. You can disagree with it — most people do, once.',
  },
  {
    n: '03',
    t: 'Try them properly',
    d: 'A discovery set, worn over a week. The value comes off your first full bottle.',
  },
]

function Discovery() {
  return (
    <section
      aria-labelledby="discovery-heading"
      className="rule relative overflow-hidden border-y bg-ivory-deep py-24 md:py-32"
    >
      <MonogramWash tone="ivory" opacity={0.045} />
      <div className="shell relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Monogram tone="espresso" width={58} className="mx-auto opacity-35" />
          <p className="eyebrow mt-8 text-rosewood">Scent discovery</p>
          <h2 id="discovery-heading" className="display-lg mt-6 text-espresso">
            Nobody should buy fragrance blind
          </h2>
          <p className="lede mt-7 text-rosewood">
            Choosing a scent from a description is guesswork. So we made the
            guesswork shorter, and the trying easier.
          </p>
        </Reveal>

        <ol className="mt-20 grid gap-12 md:grid-cols-3 md:gap-10">
          {DISCOVERY_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 110} as="li">
              <p className="display-md text-rosewood/70">{s.n}</p>
              <h3 className="display-sm mt-5 text-espresso">{s.t}</h3>
              <p className="mt-4 text-sm leading-relaxed text-rosewood">{s.d}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={220} className="mt-16 flex justify-center">
          <Link href="/discovery" className="btn btn-solid">
            Begin the discovery
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- layering */

function Layering() {
  const pairs = LAYERING_PAIRS.slice(0, 3)

  return (
    <section
      aria-labelledby="layering-heading"
      className="relative overflow-hidden bg-rosewood text-ivory"
    >
      <MonogramWash tone="rosewood" opacity={0.1} />

      <div className="shell relative py-24 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-ivory/70">The layering house</p>
          <h2 id="layering-heading" className="display-lg mt-6 text-ivory">
            One fragrance is a choice. Two is a signature.
          </h2>
          <p className="lede mt-7 text-ivory/70">
            Every composition in the house is built to hold its shape next to
            another. Wear one. Or find the pair nobody else is wearing.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-10 md:grid-cols-3">
          {pairs.map((pair, i) => {
            const a = getProduct(pair.a)
            const b = getProduct(pair.b)
            if (!a || !b) return null

            return (
              <Reveal key={pair.name} delay={i * 110} as="li">
                <div className="rule-inverse border-t pt-8">
                  <div className="flex items-end gap-2">
                    <Flacon product={a} className="h-28 w-20" />
                    <span
                      className="display-sm pb-6 text-ivory/55"
                      aria-hidden="true"
                    >
                      +
                    </span>
                    <Flacon product={b} className="h-28 w-20" />
                  </div>
                  <p className="eyebrow mt-7 text-ivory/70">
                    {a.reference} + {b.reference}
                  </p>
                  <h3 className="display-sm mt-3 text-ivory">{pair.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/70">
                    {pair.note}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </ul>

        <Reveal delay={240} className="mt-14">
          <Link href="/layering" className="btn btn-inverse">
            How layering works
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- story */

function Story() {
  return (
    <section aria-labelledby="story-heading" className="bg-ivory py-24 md:py-32">
      <div className="shell grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal className="relative">
          <div className="relative aspect-4/5 w-full overflow-hidden bg-espresso">
            <Image
              src="/brand/stacked-espresso.png"
              alt="The Ness lockup with the monogram beneath"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow text-rosewood">The house</p>
          <h2 id="story-heading" className="display-lg mt-6 text-espresso">
            Luxury you can actually reach
          </h2>
          <div className="lede mt-7 space-y-6 text-rosewood">
            <p>
              Ness began from a straightforward frustration: the
              fragrances that felt like something were priced like an heirloom,
              and the ones people could afford smelled like everyone else.
            </p>
            <p>
              So the house was built the other way round. Compositions first —
              eight of them, each with a clear point of view — and then a price
              that lets you own more than one.
            </p>
            <p>
              The monogram is an abstract N — a mark of its own, set beside the
              name rather than inside it. It closes back on itself because that
              is what a scent does: it leaves, and it returns, and you only
              notice it on the way past.
            </p>
          </div>
          <Link
            href="/the-house"
            className="eyebrow link-quiet link-drawn mt-10 inline-block text-espresso"
          >
            Read the house story
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- final CTA */

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-burgundy text-ivory">
      <MonogramWash tone="burgundy" opacity={0.12} />
      <div className="shell relative py-24 md:py-32">
        <MonogramRule tone="ivory" className="mb-16" />
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <h2 className="display-lg max-w-[15ch] text-ivory">
              The house opens soon
            </h2>
            <p className="lede mt-7 max-w-md text-ivory/70">
              The first collection is being finalised. Names, notes and prices
              shown here are placeholders while the compositions are settled.
            </p>
          </Reveal>
          <Reveal delay={140} className="flex lg:justify-end">
            <Newsletter tone="dark" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
