import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/Reveal'
import { Monogram, MonogramRule, MonogramWash } from '@/components/Monogram'

export const metadata: Metadata = {
  title: 'The House',
  description:
    'Ness is a house of scents built on one idea: fragrance with a point of view, at a price that lets you own more than one.',
  alternates: { canonical: '/the-house' },
}

const PRINCIPLES = [
  {
    n: '01',
    t: 'Composition before packaging',
    d: 'The bottle is deliberately plain. Nothing in the budget goes into a heavy cap that you throw away.',
  },
  {
    n: '02',
    t: 'No gendered aisles',
    d: 'Fragrance is described by what is in it and how it behaves. Who wears it is not our business.',
  },
  {
    n: '03',
    t: 'Made to be combined',
    d: 'Every composition is built to hold its shape beside another. The house is a wardrobe, not eight rivals.',
  },
  {
    n: '04',
    t: 'Honest about what it is',
    d: 'No performance claims, no invented heritage, no notes we cannot point to. If we do not know yet, it says so.',
  },
]

export default function TheHousePage() {
  return (
    <>
      {/* Header */}
      <section className="bg-ivory pt-36 md:pt-44">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-rosewood">The house</p>
            <h1 className="display-xl mt-7 max-w-[11ch] text-espresso">
              House of Scents
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Opening spread */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-4/5 w-full overflow-hidden bg-burgundy">
              <Image
                src="/brand/stacked-burgundy.png"
                alt="The Ness lockup on burgundy, monogram beneath the wordmark"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="lede space-y-7 text-rosewood">
              <p className="display-md text-espresso">
                Ness began from a straightforward frustration.
              </p>
              <p>
                The fragrances that felt like <em>something</em> — that had a
                point of view, an edge, a reason to exist — were priced like an
                heirloom. And the ones that people could actually afford smelled
                like everyone else in the room.
              </p>
              <p>
                There was no good reason for that gap. Most of what you pay for
                in a designer bottle is the bottle, the campaign, and the
                counter it sits on. Very little of it is the perfumery.
              </p>
              <p>
                So the house was built the other way round. Compositions first —
                eight of them, each with a clear position — and then a price
                that lets you own more than one. Because owning more than one is
                the entire point.
              </p>
              <p>
                We call it a house of scents rather than a fragrance brand
                because a house is somewhere you return to. You are not meant to
                buy one bottle and be finished with us.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The monogram */}
      <section
        aria-labelledby="mark-heading"
        className="relative overflow-hidden bg-espresso py-24 text-ivory md:py-32"
      >
        <div className="shell relative grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal className="flex justify-center lg:justify-start">
            <Monogram tone="ivory" width={340} className="w-56 md:w-80" />
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow text-ivory/60">The mark</p>
            <h2 id="mark-heading" className="display-lg mt-6 text-ivory">
              It is an N
            </h2>
            <div className="lede mt-7 space-y-6 text-ivory/70">
              <p>
                People read it as an infinity symbol. It is not one. It is an
                abstract N for Ness, drawn as a single unbroken line that turns
                back on itself at both ends.
              </p>
              <p>
                It was drawn that way because it is how scent actually behaves.
                A fragrance leaves and returns. You stop noticing your own, then
                catch it an hour later on a sleeve. The line never quite closes
                and never quite ends.
              </p>
              <p>
                It is not part of the logo. It sits beside the wordmark, never
                inside it — beneath the lockup, on the cap, pressed into the
                label. A separate signature, and the one element that turns up
                everywhere.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-heading" className="bg-ivory py-24 md:py-32">
        <div className="shell">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-rosewood">How we work</p>
            <h2 id="principles-heading" className="display-lg mt-6 text-espresso">
              Four things we hold to
            </h2>
          </Reveal>

          <ol className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.n} delay={(i % 2) * 110} as="li">
                <div className="rule border-t pt-8">
                  <p className="display-md text-rosewood/70">{p.n}</p>
                  <h3 className="display-sm mt-5 text-espresso">{p.t}</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-rosewood">
                    {p.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Where it is going */}
      <section className="rule relative overflow-hidden border-t bg-ivory-deep py-24 md:py-32">
        <MonogramWash tone="ivory" opacity={0.045} />
        <div className="shell relative">
          <MonogramRule className="mb-16" />
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-rosewood">What comes next</p>
            <h2 className="display-lg mt-6 text-espresso">
              Fine fragrance first
            </h2>
            <p className="lede mt-7 text-rosewood">
              The house opens with fine fragrance and nothing else. Eaux de
              toilette, extraits, hair mists, roll-ons and solid perfumes are in
              development, and bespoke commissions will follow. None of it is
              available yet, and we would rather say so than pre-sell it.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link href="/shop" className="btn btn-solid">
                See the collection
              </Link>
              <Link href="/bespoke" className="btn">
                Bespoke commissions
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
