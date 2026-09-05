'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { formatPrice } from '@/data/products'
import { Flacon } from './Flacon'
import { Monogram } from './Monogram'
import { useStore } from './StoreProvider'

export function BagDrawer() {
  const { bagOpen, closeBag, lines, subtotal, count, setQty, remove, hasUnpricedLine } =
    useStore()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bagOpen) panelRef.current?.focus()
  }, [bagOpen])

  return (
    // `inert` (not aria-hidden) so the closed drawer leaves the tab order as
    // well as the accessibility tree — aria-hidden alone still lets keyboard
    // users land inside it.
    <div
      className={`fixed inset-0 z-60 ${bagOpen ? '' : 'pointer-events-none'}`}
      inert={!bagOpen}
    >
      <div
        onClick={closeBag}
        className={`absolute inset-0 bg-espresso/40 transition-opacity duration-600 ${
          bagOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal={bagOpen}
        aria-label="Shopping bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[30rem] flex-col bg-ivory shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none ${
          bagOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="rule flex items-center justify-between border-b px-6 py-6 md:px-8">
          <h2 className="eyebrow text-espresso">
            The Bag{count > 0 ? ` — ${count}` : ''}
          </h2>
          <button type="button" onClick={closeBag} className="eyebrow link-quiet">
            Close
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <Monogram tone="espresso" width={64} className="opacity-20" />
            <p className="display-sm text-espresso">Your bag is empty.</p>
            <p className="max-w-xs text-sm text-rosewood">
              Not sure where to begin? A discovery set is the honest way to find
              yours.
            </p>
            <Link href="/shop?format=discovery" onClick={closeBag} className="btn">
              Discovery sets
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 md:px-8">
              {lines.map((line) => (
                <li
                  key={line.sku}
                  className="rule-soft flex gap-5 border-b py-6 last:border-0"
                >
                  <Link
                    href={`/product/${line.slug}`}
                    onClick={closeBag}
                    className="shrink-0"
                    style={{ backgroundColor: line.product.art.panel }}
                  >
                    <Flacon product={line.product} className="h-28 w-20" />
                  </Link>

                  <div className="flex flex-1 flex-col gap-1">
                    <p className="eyebrow text-rosewood">{line.product.reference}</p>
                    <Link
                      href={`/product/${line.slug}`}
                      onClick={closeBag}
                      className="display-sm leading-tight text-espresso"
                    >
                      {line.product.title}
                    </Link>
                    <p className="text-xs text-rosewood">{line.variant.size}</p>

                    <div className="mt-3 flex items-center justify-between gap-4">
                      <div className="rule flex items-center border">
                        <button
                          type="button"
                          onClick={() => setQty(line.sku, line.qty - 1)}
                          aria-label={`Decrease quantity of ${line.product.title}`}
                          className="px-3 py-1.5 text-sm leading-none text-espresso transition-opacity hover:opacity-50"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center text-xs tabular-nums">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(line.sku, line.qty + 1)}
                          aria-label={`Increase quantity of ${line.product.title}`}
                          className="px-3 py-1.5 text-sm leading-none text-espresso transition-opacity hover:opacity-50"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm tabular-nums text-espresso">
                        {formatPrice(line.lineTotal)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(line.sku)}
                      className="eyebrow link-quiet mt-3 self-start text-rosewood"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="rule border-t px-6 py-6 md:px-8">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow text-rosewood">Subtotal</span>
                <span className="display-sm tabular-nums text-espresso">
                  {formatPrice(subtotal)}
                </span>
              </div>
              {hasUnpricedLine && (
                <p className="mt-2 text-xs text-rosewood">
                  Some items are not yet priced and are excluded from this subtotal.
                </p>
              )}
              <p className="mt-2 text-xs text-rosewood">
                Taxes and shipping calculated at checkout.
              </p>
              <button type="button" disabled className="btn btn-solid mt-5 w-full">
                Checkout unavailable
              </button>
              <p className="mt-3 text-center text-xs text-rosewood">
                This is a design prototype — no order can be placed.
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
