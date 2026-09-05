import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal } from '@/components/Reveal'
import { Monogram, MonogramRule, MonogramWash } from '@/components/Monogram'
import { BespokeEnquiry } from '@/components/BespokeEnquiry'

export const metadata: Metadata = {
  title: 'Bespoke',
  description:
    'The Ness bespoke commission — a fragrance composed for one person. Currently in preparation; enquiries are being noted for the opening list.',
  alternates: { canonical: '/bespoke' },
}

const STAGES = [
  {
    n: 'I',
    t: 'The conversation',
    d: 'Two hours, no notes discussed. We talk about places, weather, materials, people, and what you have worn before and abandoned. Most of what matters comes out here.',
  },
  {
    n: 'II',
    t: 'The first sketches',
    d: 'Three directions, built from that conversation and deliberately far apart. You live with them for a month. Almost nobody chooses the one they expected.',
  },
  {
    n: 'III',
    t: 'The revisions',
    d: 'One direction is taken forward through as many rounds as it needs. This is the long part — usually four to six months, occasionally longer.',
  },
  {
    n: 'IV',
    t: 'The formula',
    d: 'The finished composition is bottled, and the formula is kept under your name. You can reorder it for as long as the house exists.',
  },
]

export default function BespokePage() {
  return (
    <>
      {/* Header — the darkest, quietest page in the house */}
      <section className="relative overflow-hidden bg-ink pt-36 text-ivory md:pt-48">
        <MonogramWash tone="black" opacity={0.09} />
        <div className="shell relative pb-28 md:pb-40">
          <Reveal className="max-w-3xl">
            <Monogram tone="ivory" width={64} className="opacity-55" />
            <p className="eyebrow mt-9 text-ivory/60">By commission</p>
            <h1 className="display-xl mt-7 max-w-[9ch] text-ivory">Bespoke</h1>
            <p className="lede mt-9 max-w-xl text-ivory/60">
              A fragrance composed for one person, from an empty page. Not a
              product with your name on it — a formula that exists because you
              asked for it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Editorial statement */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="shell-narrow">
          <Reveal>
            <p className="display-md text-espresso">
              Almost nobody needs a bespoke fragrance.
            </p>
            <div className="lede mt-9 space-y-7 text-rosewood">
              <p>
                That is the honest starting point, and we would rather say it
                here than after you have paid for it. The eight compositions in
                the house cover most of what most people want, and a well-chosen
                layered pair covers most of the rest.
              </p>
              <p>
                Bespoke is for the narrow case where none of that works: a
                material you have never found done properly, a scent attached to
                a place or a person that does not exist commercially, or a
                requirement — a wedding, a house, an anniversary — that wants
                something singular.
              </p>
              <p>
                It takes months, not weeks. It involves being told that your
                first instinct was wrong. And it produces one formula, held
                under one name, that nobody else can buy.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The commission */}
      <section
        aria-labelledby="stages-heading"
        className="relative overflow-hidden bg-burgundy py-24 text-ivory md:py-32"
      >
        <MonogramWash tone="burgundy" opacity={0.1} />
        <div className="shell relative">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-ivory/55">The commission</p>
            <h2 id="stages-heading" className="display-lg mt-6 text-ivory">
              Four stages, and a long middle
            </h2>
          </Reveal>

          <ol className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2">
            {STAGES.map((s, i) => (
              <Reveal key={s.n} delay={(i % 2) * 110} as="li">
                <div className="rule-inverse border-t pt-8">
                  <p className="display-md font-display text-ivory/50">{s.n}</p>
                  <h3 className="display-sm mt-5 text-ivory">{s.t}</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/65">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Enquiry */}
      <section
        aria-labelledby="enquiry-heading"
        className="bg-ivory py-24 md:py-32"
      >
        <div className="shell">
          <MonogramRule className="mb-16" />
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <p className="eyebrow text-rosewood">Enquiries</p>
              <h2 id="enquiry-heading" className="display-lg mt-6 text-espresso">
                The house is not taking commissions yet
              </h2>
              <div className="lede mt-7 space-y-6 text-rosewood">
                <p>
                  Bespoke commissions will begin after the first collection is
                  released. Until then there is no fee, no waiting list deposit
                  and no scheduling — only a note of interest.
                </p>
                <p>
                  Tell us roughly what you are after and we will come back to
                  you when the house opens for commissions.
                </p>
              </div>
            </Reveal>

            <Reveal delay={130}>
              <BespokeEnquiry />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="rule border-t bg-ivory-deep py-20">
        <div className="shell flex flex-col items-center gap-8 text-center">
          <p className="lede max-w-xl text-rosewood">
            Not ready for a commission? Most people should start with the
            collection.
          </p>
          <Link href="/shop" className="btn">
            See the collection
          </Link>
        </div>
      </section>
    </>
  )
}
