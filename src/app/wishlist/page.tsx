'use client'

import Link from 'next/link'
import { Reveal } from '@/components/Reveal'
import { ProductCard } from '@/components/ProductCard'
import { Monogram } from '@/components/Monogram'
import { useStore } from '@/components/StoreProvider'
import { getProduct } from '@/data/products'

export default function WishlistPage() {
  const { wishlist, ready } = useStore()

  const saved = wishlist
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <section className="min-h-[70vh] bg-ivory pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="shell">
        <Reveal>
          <p className="eyebrow text-rosewood">Saved</p>
          <h1 className="display-lg mt-6 text-espresso">The Wishlist</h1>
          <p className="lede mt-7 max-w-xl text-rosewood">
            Kept in this browser only. Nothing is sent anywhere, and clearing
            your site data will clear this list.
          </p>
        </Reveal>

        {!ready ? (
          <p className="eyebrow mt-20 text-rosewood">Loading…</p>
        ) : saved.length === 0 ? (
          <div className="rule mt-16 flex flex-col items-center gap-7 border-t py-24 text-center">
            <Monogram tone="espresso" width={62} className="opacity-20" />
            <p className="display-sm text-espresso">Nothing saved yet.</p>
            <p className="max-w-sm text-sm text-rosewood">
              Use the heart on any composition to keep it here while you decide.
            </p>
            <Link href="/shop" className="btn mt-2">
              Browse the collection
            </Link>
          </div>
        ) : (
          <>
            <p className="eyebrow mt-16 text-rosewood">
              {saved.length} {saved.length === 1 ? 'piece' : 'pieces'}
            </p>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-14 md:gap-x-8 lg:grid-cols-4">
              {saved.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
