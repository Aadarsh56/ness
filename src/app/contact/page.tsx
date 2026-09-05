import type { Metadata } from 'next'
import Link from 'next/link'
import { EditorialPage, Entry, Placeholder } from '@/components/Editorial'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'How to reach Ness about the collection, a bespoke commission, press or stockists.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <EditorialPage
      eyebrow="Client care"
      title="Contact"
      intro="The house is small and the inbox is read by the people who make the decisions."
    >
      <Entry term="About the collection">
        <p>
          Questions about a composition, a format, or which one to start with.
          If you are choosing between two, say which two — the answer is more
          useful than a general recommendation.
        </p>
        <Placeholder>
          A client care address will be published here before the house opens.
        </Placeholder>
      </Entry>

      <Entry term="Bespoke commissions">
        <p>
          Commissions have not opened. Interest can be registered on the bespoke
          page, and you will be written to when the house begins taking them.
        </p>
        <p>
          <Link href="/bespoke" className="link-quiet link-drawn text-espresso">
            Bespoke commissions
          </Link>
        </p>
      </Entry>

      <Entry term="Press and stockists">
        <p>
          Wholesale, press samples and editorial requests will be handled
          through a separate address once the collection is released.
        </p>
        <Placeholder>
          Press and wholesale contacts are not yet assigned.
        </Placeholder>
      </Entry>

      <Entry term="Existing orders">
        <p>
          There are none. This site is a design prototype — the bag works, but
          no order can be placed and no payment is taken anywhere on it.
        </p>
      </Entry>
    </EditorialPage>
  )
}
