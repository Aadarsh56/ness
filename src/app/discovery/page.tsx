import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal } from '@/components/Reveal'
import { ScentQuiz } from '@/components/ScentQuiz'
import { ProductCard } from '@/components/ProductCard'
import { MonogramRule, MonogramWash } from '@/components/Monogram'
import { getProducts } from '@/data/products'

export const metadata: Metadata = {
  title: 'Scent Discovery',
  description:
    'Six questions and three compositions. A transparent way to find the Ness fragrance that suits how you actually live.',
  alternates: { canonical: '/discovery' },
}

export default function DiscoveryPage() {
  const sets = getProducts('discovery')

  return (
    <>
      <section className="relative overflow-hidden bg-espresso pt-36 text-ivory md:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-20 h-[38rem] w-[38rem] bg-contain bg-no-repeat opacity-[0.06]"
          style={{ backgroundImage: 'url(/brand/monogram-ivory.png)' }}
        />
        <div className="shell relative pb-24 md:pb-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-ivory/60">Scent discovery</p>
            <h1 className="display-lg mt-6 text-ivory">
              Six questions. No personality test.
            </h1>
            <p className="lede mt-7 text-ivory/70">
              Fragrance recommendation is usually a guess dressed up as science.
              This is still a guess — but you can see exactly how it was made,
              and disagree with it.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Scent quiz" className="bg-ivory py-20 md:py-28">
        <div className="shell max-w-5xl">
          <ScentQuiz />
        </div>
      </section>

      <section
        aria-labelledby="sets-heading"
        className="rule relative overflow-hidden border-t bg-ivory-deep py-24 md:py-32"
      >
        <MonogramWash tone="ivory" opacity={0.045} />
        <div className="shell relative">
          <MonogramRule className="mb-16" />
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-rosewood">The next step</p>
            <h2 id="sets-heading" className="display-lg mt-6 text-espresso">
              A screen cannot tell you how it smells
            </h2>
            <p className="lede mt-7 text-rosewood">
              Wear it for a week before you commit. The value of a discovery set
              comes off your first full bottle.
            </p>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
            {sets.map((p, i) => (
              <Reveal key={p.slug} delay={i * 110}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={220} className="mt-16 flex justify-center">
            <Link href="/layering" className="btn">
              Or learn to layer
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
