import type { Metadata } from 'next'
import Link from 'next/link'
import { EditorialPage, Entry, Placeholder } from '@/components/Editorial'

export const metadata: Metadata = {
  title: 'Fragrance FAQ',
  description:
    'How concentrations differ, how to make fragrance last, how layering works, and what Ness will and will not claim.',
  alternates: { canonical: '/faq' },
}

export default function FaqPage() {
  return (
    <EditorialPage
      eyebrow="Client care"
      title="Fragrance FAQ"
      intro="The questions worth answering honestly, including the ones where the answer is that it depends on you."
    >
      <Entry term="What is the difference between the concentrations?">
        <p>
          Broadly, it is how much perfume oil sits in the alcohol. Eau de
          toilette is lighter and shorter; eau de parfum is denser and lasts
          longer; extrait is denser still and sits very close to the skin. A
          perfume oil skips the alcohol entirely, which makes it quieter and
          slower to fade.
        </p>
        <p>
          Higher concentration is not the same as better. A well-built eau de
          parfum will outperform a heavy extrait you do not actually enjoy
          wearing.
        </p>
      </Entry>

      <Entry term="How long will it last on me?">
        <p>
          Genuinely nobody can tell you that from a website. Longevity depends
          on your skin, how hydrated it is, the weather, and where you applied
          it — and it varies more between two people than between two
          fragrances.
        </p>
        <Placeholder>
          The house does not publish longevity or projection figures, because
          any number given would be a marketing claim rather than a measurement.
        </Placeholder>
      </Entry>

      <Entry term="How should I apply it?">
        <p>
          On moisturised skin, at pulse points — wrists, the base of the throat,
          behind the ears. Do not rub your wrists together; it crushes the top
          notes and shortens the opening.
        </p>
        <p>
          If a fragrance disappears on you quickly, apply less but more often,
          or use the matching body mist underneath as a base for it to hold on
          to.
        </p>
      </Entry>

      <Entry term="Can I layer any two of them?">
        <p>
          Technically yes, and some combinations will be unpleasant. The house
          publishes six pairs that already work, along with the four rules that
          make most other combinations work too.
        </p>
        <p>
          <Link href="/layering" className="link-quiet link-drawn text-espresso">
            The layering guide
          </Link>
        </p>
      </Entry>

      <Entry term="Are the fragrances for men or women?">
        <p>
          Neither. Every composition is described by what is in it and how it
          behaves. Some skew traditionally masculine or feminine in their
          materials, and that is noted plainly, but nothing here is sold by
          gender.
        </p>
      </Entry>

      <Entry term="Are the names and prices on this site final?">
        <p>
          No. The first collection is still being finalised. Fragrance names,
          notes, prices, sizes and availability shown across the site are
          placeholders while the compositions are settled.
        </p>
        <Placeholder>
          Nothing on this site should be relied on as a commitment to a
          particular product, formula or price.
        </Placeholder>
      </Entry>

      <Entry term="Do you test on animals?">
        <p>
          The house position on testing, ingredient sourcing and IFRA compliance
          will be stated here in full before launch.
        </p>
        <Placeholder>
          This answer is deliberately unwritten rather than guessed at.
        </Placeholder>
      </Entry>
    </EditorialPage>
  )
}
