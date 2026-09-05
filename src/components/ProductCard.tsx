'use client'

import Link from 'next/link'
import { formatPrice, fromPrice, type Product } from '@/data/products'
import { Flacon } from './Flacon'
import { useStore } from './StoreProvider'

export function WishButton({
  slug,
  title,
  className = '',
}: {
  slug: string
  title: string
  className?: string
}) {
  const { isWished, toggleWish, ready } = useStore()
  const wished = ready && isWished(slug)

  return (
    <button
      type="button"
      onClick={() => toggleWish(slug)}
      aria-pressed={wished}
      aria-label={
        wished ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`
      }
      className={`transition-opacity duration-400 hover:opacity-60 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        width="17"
        height="17"
        fill={wished ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.1"
        aria-hidden="true"
      >
        <path d="M12 20.5 4.2 12.9a4.6 4.6 0 0 1 6.5-6.5l1.3 1.3 1.3-1.3a4.6 4.6 0 1 1 6.5 6.5Z" />
      </svg>
    </button>
  )
}

export function ProductCard({ product }: { product: Product }) {
  const price = fromPrice(product)
  const soon = product.status === 'coming-soon'

  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden"
        style={{ backgroundColor: product.art.panel }}
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="aspect-[4/5] w-full">
          <Flacon
            product={product}
            className="h-full w-full p-8 transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045] md:p-12"
          />
        </div>

        {soon && (
          <span
            className={`eyebrow absolute left-4 top-4 border px-3 py-1.5 ${
              product.art.onDark
                ? 'border-ivory/35 text-ivory'
                : 'border-espresso/25 text-espresso'
            }`}
          >
            Coming soon
          </span>
        )}
      </Link>

      {/* Meta is stacked rather than title-beside-price: in a two-column
          mobile grid a side-by-side row squeezes both to one word per line. */}
      <div className="pt-5">
        <div className="flex items-start justify-between gap-3">
          <p className="eyebrow text-rosewood">
            {product.reference} · {product.family}
          </p>
          <WishButton
            slug={product.slug}
            title={product.title}
            className="shrink-0 text-rosewood"
          />
        </div>

        <h3 className="display-sm mt-2.5 text-espresso">
          <Link href={`/product/${product.slug}`} className="link-quiet">
            {product.title}
          </Link>
        </h3>

        <p className="mt-1.5 text-sm text-rosewood">{product.tagline}</p>

        <p className="mt-3 text-sm tabular-nums text-espresso">
          {price === null ? (
            'Price on launch'
          ) : (
            <>
              <span className="text-rosewood">from </span>
              {formatPrice(price)}
            </>
          )}
        </p>
      </div>
    </article>
  )
}
