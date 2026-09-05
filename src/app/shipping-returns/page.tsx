import type { Metadata } from 'next'
import { EditorialPage, Entry, Placeholder } from '@/components/Editorial'

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description:
    'Shipping, delivery and returns information for Ness. Rates and windows are being finalised ahead of the house opening.',
  alternates: { canonical: '/shipping-returns' },
}

export default function ShippingReturnsPage() {
  return (
    <EditorialPage
      eyebrow="Client care"
      title="Shipping & Returns"
      intro="The house has not opened, so none of this is live yet. What follows is the shape of the policy, not the final terms."
    >
      <Entry term="Delivery">
        <p>
          Orders will be dispatched from a single location. Fragrance is
          classified as a restricted good for air freight, which affects both
          cost and the destinations that can be served.
        </p>
        <Placeholder>
          Rates, carriers, delivery windows and the list of served countries are
          not yet set and will be published here before the first order is
          taken.
        </Placeholder>
      </Entry>

      <Entry term="Returns">
        <p>
          Sealed, unopened items will be returnable within a stated window. Once
          a fragrance has been sprayed it cannot be resold or restocked, so
          opened bottles will not be returnable except where the item is faulty
          or was sent in error.
        </p>
        <p>
          This is exactly why the house leads with discovery sets and travel
          sizes — they exist so that nobody has to gamble on a full bottle.
        </p>
        <Placeholder>
          The length of the returns window, who pays return postage, and the
          refund method are still being decided.
        </Placeholder>
      </Entry>

      <Entry term="Faulty or damaged items">
        <p>
          Anything that arrives broken, leaking or incorrect will be replaced or
          refunded in full, including postage. Photographs of the item and the
          outer packaging will be requested.
        </p>
      </Entry>

      <Entry term="Discovery set credit">
        <p>
          The stated intention is that the value of a discovery set is
          redeemable against a subsequent full bottle. The mechanism — a code, an
          automatic credit, or a manual adjustment — has not been settled.
        </p>
        <Placeholder>
          Treat this as an intention rather than a commitment until it is
          confirmed here.
        </Placeholder>
      </Entry>
    </EditorialPage>
  )
}
