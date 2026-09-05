'use client'

import { useState } from 'react'
import { formatPrice, getFormat, type Product } from '@/data/products'
import { useStore } from './StoreProvider'
import { WishButton } from './ProductCard'

export function ProductPurchase({ product }: { product: Product }) {
  const { add, isWished, ready } = useStore()
  const [sku, setSku] = useState(
    product.variants.find((v) => v.inStock)?.sku ?? product.variants[0]?.sku,
  )

  const selected = product.variants.find((v) => v.sku === sku)
  const purchasable =
    product.status === 'available' && Boolean(selected?.inStock)

  return (
    <div>
      {/* Size / format selector */}
      <fieldset>
        <legend className="eyebrow text-rosewood">Size</legend>
        <div className="mt-5 flex flex-wrap gap-3">
          {product.variants.map((v) => {
            const active = v.sku === sku
            return (
              <label
                key={v.sku}
                className={`cursor-pointer border px-5 py-3.5 transition-colors duration-500 ${
                  active
                    ? 'border-espresso bg-espresso text-ivory'
                    : 'rule text-espresso hover:border-espresso/50'
                } ${v.inStock ? '' : 'cursor-not-allowed opacity-40'}`}
              >
                <input
                  type="radio"
                  name={`size-${product.slug}`}
                  value={v.sku}
                  checked={active}
                  disabled={!v.inStock}
                  onChange={() => setSku(v.sku)}
                  className="sr-only"
                />
                <span className="block text-sm leading-none">{v.size}</span>
                <span
                  className={`eyebrow mt-2 block ${
                    active ? 'text-ivory/60' : 'text-rosewood'
                  }`}
                >
                  {getFormat(v.format).label}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {/* Price */}
      <p className="display-md mt-10 tabular-nums text-espresso">
        {formatPrice(selected?.price ?? null)}
      </p>
      <p className="mt-2 text-xs text-rosewood">
        Placeholder pricing. Inclusive of taxes where applicable.
      </p>

      {/* Actions */}
      <div className="mt-8 flex items-stretch gap-3">
        <button
          type="button"
          disabled={!purchasable || !selected}
          onClick={() => selected && add(product.slug, selected.sku)}
          className="btn btn-solid flex-1"
        >
          {product.status === 'coming-soon'
            ? 'Coming soon'
            : purchasable
              ? 'Add to bag'
              : 'Unavailable'}
        </button>

        <span className="rule flex items-center border px-5 text-espresso">
          <WishButton slug={product.slug} title={product.title} />
          <span className="eyebrow ml-3 hidden sm:inline">
            {ready && isWished(product.slug) ? 'Saved' : 'Save'}
          </span>
        </span>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-rosewood">
        This is a design prototype — items can be added to the bag, but no order
        can be placed.
      </p>
    </div>
  )
}
