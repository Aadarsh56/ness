import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal } from '@/components/Reveal'
import { Flacon } from '@/components/Flacon'
import { MonogramRule, MonogramWash } from '@/components/Monogram'
import { LAYERING_PAIRS, getProduct } from '@/data/products'

export const metadata: Metadata = {
  title: 'Layering',
  description:
    'How to combine Ness fragrances into a scent nobody else is wearing — the method, the pairs, and the mistakes worth avoiding.',
  alternates: { canonical: '/layering' },
}

const METHOD = [
  {
    n: '01',
    t: 'Heaviest first',
    d: 'Apply the denser composition to skin, then the lighter one over it. Reverse this and the lighter one simply disappears.',
  },
  {
    n: '02',
    t: 'Two, not three',
    d: 'A third fragrance almost always turns the pair to mud. If you want a third note, add it as a body mist, not a parfum.',
  },
  {
    n: '03',
    t: 'Different families',
    d: 'Two gourmands compete. A woody under a floral, or a musk over an amber, gives each one somewhere to sit.',
  },
  {
    n: '04',
    t: 'Wait a minute',
    d: 'Let the first settle before the second goes on. Sprayed together they read as one muddled accord instead of two layers.',
  },
]

export default function LayeringPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-rosewood pt-36 text-ivory md:pt-44">
        <MonogramWash tone="rosewood" opacity={0.1} />
        <div className="shell relative pb-24 md:pb-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-ivory/55">The layering house</p>
            <h1 className="display-lg mt-6 text-ivory">
              One fragrance is a choice. Two is a signature.
            </h1>
            <p className="lede mt-7 text-ivory/70">
              Every composition here was built with a second one in mind. Not as
              a gimmick — as the actual point. A layered scent cannot be bought
              off a shelf, because you made it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Method */}
      <section aria-labelledby="method-heading" className="bg-ivory py-24 md:py-32">
        <div className="shell">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-rosewood">The method</p>
            <h2 id="method-heading" className="display-lg mt-6 text-espresso">
              Four rules, then break them
            </h2>
          </Reveal>

          <ol className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {METHOD.map((m, i) => (
              <Reveal key={m.n} delay={(i % 2) * 110} as="li">
                <div className="rule border-t pt-8">
                  <p className="display-md text-rosewood/70">{m.n}</p>
                  <h3 className="display-sm mt-5 text-espresso">{m.t}</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-rosewood">
                    {m.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Pairs */}
      <section
        aria-labelledby="pairs-heading"
        className="rule relative overflow-hidden border-t bg-ivory-deep py-24 md:py-32"
      >
        <MonogramWash tone="ivory" opacity={0.045} />
        <div className="shell relative">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-rosewood">Composed pairs</p>
            <h2 id="pairs-heading" className="display-lg mt-6 text-espresso">
              Six that already work
            </h2>
            <p className="lede mt-7 text-rosewood">
              Start here, then go and ruin them into something that is yours.
            </p>
          </Reveal>

          <ul className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {LAYERING_PAIRS.map((pair, i) => {
              const a = getProduct(pair.a)
              const b = getProduct(pair.b)
              if (!a || !b) return null

              return (
                <Reveal key={pair.name} delay={(i % 3) * 100} as="li">
                  <div className="flex gap-3">
                    <Link
                      href={`/product/${a.slug}`}
                      className="group flex-1 overflow-hidden"
                      style={{ backgroundColor: a.art.panel }}
                      aria-label={a.title}
                    >
                      <Flacon
                        product={a}
                        className="aspect-3/4 w-full p-5 transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                    </Link>
                    <Link
                      href={`/product/${b.slug}`}
                      className="group flex-1 overflow-hidden"
                      style={{ backgroundColor: b.art.panel }}
                      aria-label={b.title}
                    >
                      <Flacon
                        product={b}
                        className="aspect-3/4 w-full p-5 transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                    </Link>
                  </div>

                  <p className="eyebrow mt-6 text-rosewood">
                    {a.reference} + {b.reference}
                  </p>
                  <h3 className="display-sm mt-3 text-espresso">{pair.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-rosewood">
                    {pair.note}
                  </p>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Close */}
      <section className="relative overflow-hidden bg-espresso py-24 text-ivory md:py-32">
        <div className="shell relative">
          <MonogramRule tone="ivory" className="mb-14" />
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="display-lg text-ivory">
              The cheapest way to try a pair
            </h2>
            <p className="lede mt-7 text-ivory/70">
              Two travel sizes cost less than one full bottle, and tell you far
              more. Layer them for a fortnight before you commit to either.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link href="/shop?format=travel" className="btn btn-inverse">
                Travel sizes
              </Link>
              <Link href="/shop?format=discovery" className="btn btn-inverse">
                Discovery sets
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
