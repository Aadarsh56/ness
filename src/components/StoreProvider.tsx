'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { getProduct, type Product, type Variant } from '@/data/products'

/* ---------------------------------------------------------------------------
 * Front-end only. There is no backend and no payment flow — the bag and the
 * wishlist persist to localStorage so the prototype behaves like a real store
 * without pretending to be one.
 * ------------------------------------------------------------------------- */

export interface BagLine {
  slug: string
  sku: string
  qty: number
}

interface StoreState {
  bag: BagLine[]
  wishlist: string[]
}

type Action =
  | { type: 'hydrate'; state: StoreState }
  | { type: 'add'; slug: string; sku: string; qty: number }
  | { type: 'setQty'; sku: string; qty: number }
  | { type: 'remove'; sku: string }
  | { type: 'clearBag' }
  | { type: 'toggleWish'; slug: string }

const EMPTY: StoreState = { bag: [], wishlist: [] }
const KEY = 'ness.store.v1'

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case 'hydrate':
      return action.state
    case 'add': {
      const existing = state.bag.find((l) => l.sku === action.sku)
      const bag = existing
        ? state.bag.map((l) =>
            l.sku === action.sku ? { ...l, qty: Math.min(l.qty + action.qty, 9) } : l,
          )
        : [...state.bag, { slug: action.slug, sku: action.sku, qty: action.qty }]
      return { ...state, bag }
    }
    case 'setQty': {
      if (action.qty <= 0) {
        return { ...state, bag: state.bag.filter((l) => l.sku !== action.sku) }
      }
      return {
        ...state,
        bag: state.bag.map((l) =>
          l.sku === action.sku ? { ...l, qty: Math.min(action.qty, 9) } : l,
        ),
      }
    }
    case 'remove':
      return { ...state, bag: state.bag.filter((l) => l.sku !== action.sku) }
    case 'clearBag':
      return { ...state, bag: [] }
    case 'toggleWish': {
      const has = state.wishlist.includes(action.slug)
      return {
        ...state,
        wishlist: has
          ? state.wishlist.filter((s) => s !== action.slug)
          : [...state.wishlist, action.slug],
      }
    }
  }
}

export interface ResolvedLine extends BagLine {
  product: Product
  variant: Variant
  lineTotal: number | null
}

interface StoreApi extends StoreState {
  ready: boolean
  lines: ResolvedLine[]
  count: number
  subtotal: number | null
  hasUnpricedLine: boolean
  bagOpen: boolean
  openBag: () => void
  closeBag: () => void
  add: (slug: string, sku: string, qty?: number) => void
  setQty: (sku: string, qty: number) => void
  remove: (sku: string) => void
  clearBag: () => void
  toggleWish: (slug: string) => void
  isWished: (slug: string) => boolean
}

const StoreContext = createContext<StoreApi | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, EMPTY)
  const [ready, setReady] = useState(false)
  const [bagOpen, setBagOpen] = useState(false)

  // Hydrate after mount so server and client markup match.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<StoreState>
        dispatch({
          type: 'hydrate',
          state: {
            bag: Array.isArray(parsed.bag) ? parsed.bag : [],
            wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
          },
        })
      }
    } catch {
      /* Private browsing or blocked storage — carry on with an empty bag. */
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* Storage unavailable; state stays in memory for this session. */
    }
  }, [state, ready])

  // Lock the page behind the bag drawer.
  useEffect(() => {
    if (!bagOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setBagOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [bagOpen])

  const lines = useMemo<ResolvedLine[]>(() => {
    return state.bag.flatMap((line) => {
      const product = getProduct(line.slug)
      if (!product) return []
      const variant = product.variants.find((v) => v.sku === line.sku)
      if (!variant) return []
      return [
        {
          ...line,
          product,
          variant,
          lineTotal: variant.price === null ? null : variant.price * line.qty,
        },
      ]
    })
  }, [state.bag])

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines])

  const hasUnpricedLine = useMemo(
    () => lines.some((l) => l.lineTotal === null),
    [lines],
  )

  const subtotal = useMemo(() => {
    const priced = lines.filter((l) => l.lineTotal !== null)
    if (!priced.length) return null
    return priced.reduce((n, l) => n + (l.lineTotal ?? 0), 0)
  }, [lines])

  const add = useCallback((slug: string, sku: string, qty = 1) => {
    dispatch({ type: 'add', slug, sku, qty })
    setBagOpen(true)
  }, [])

  const value = useMemo<StoreApi>(
    () => ({
      ...state,
      ready,
      lines,
      count,
      subtotal,
      hasUnpricedLine,
      bagOpen,
      openBag: () => setBagOpen(true),
      closeBag: () => setBagOpen(false),
      add,
      setQty: (sku, qty) => dispatch({ type: 'setQty', sku, qty }),
      remove: (sku) => dispatch({ type: 'remove', sku }),
      clearBag: () => dispatch({ type: 'clearBag' }),
      toggleWish: (slug) => dispatch({ type: 'toggleWish', slug }),
      isWished: (slug) => state.wishlist.includes(slug),
    }),
    [state, ready, lines, count, subtotal, hasUnpricedLine, bagOpen, add],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreApi {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>')
  return ctx
}
