'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Wordmark } from './Wordmark'
import { Monogram } from './Monogram'
import { useStore } from './StoreProvider'

const NAV = [
  { href: '/shop', label: 'Shop' },
  { href: '/discovery', label: 'Discovery' },
  { href: '/layering', label: 'Layering' },
  { href: '/the-house', label: 'The House' },
  { href: '/bespoke', label: 'Bespoke' },
]

export function Header() {
  const pathname = usePathname()
  const { count, openBag, wishlist, ready } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  return (
    <>
      <a
        href="#main"
        className="eyebrow sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-espresso focus:px-5 focus:py-3 focus:text-ivory"
      >
        Skip to content
      </a>

      {/* The bar keeps its ivory ground on every page. Several pages open on a
          black, espresso or rosewood hero, and a transparent header would put
          espresso nav text straight onto it. Only the hairline reacts to
          scroll. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b bg-ivory/95 backdrop-blur-sm transition-colors duration-700 ${
          scrolled || menuOpen ? 'rule' : 'border-transparent'
        }`}
      >
        <div className="shell flex h-20 items-center justify-between gap-6 md:h-24">
          {/* Left — desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden flex-1 items-center gap-9 lg:flex"
          >
            {NAV.slice(0, 3).map((item) => (
              <NavLink key={item.href} {...item} pathname={pathname} />
            ))}
          </nav>

          {/* Mobile menu toggle. Wrapped so it carries the same flex weight
              as the utilities on the right, keeping the lockup centred. */}
          <div className="flex flex-1 items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              // The visible label is hidden below `sm`, which would otherwise
              // leave this button unnamed on phones.
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="eyebrow -ml-1 flex items-center gap-2.5 py-2 text-espresso"
            >
              <span
                className="flex h-3 w-4 flex-col justify-between"
                aria-hidden="true"
              >
                <span
                  className={`h-px w-full bg-current transition-transform duration-500 ${
                    menuOpen ? 'translate-y-[5.5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-opacity duration-300 ${
                    menuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-transform duration-500 ${
                    menuOpen ? '-translate-y-[5.5px] -rotate-45' : ''
                  }`}
                />
              </span>
              <span className="hidden sm:inline">
                {menuOpen ? 'Close' : 'Menu'}
              </span>
            </button>
          </div>

          {/* Centre — lockup */}
          <Link
            href="/"
            aria-label="Ness — home"
            className="shrink-0 transition-opacity duration-500 hover:opacity-70"
          >
            <Wordmark tone="espresso" width={118} priority className="md:hidden" />
            <Wordmark
              tone="espresso"
              width={140}
              priority
              className="hidden md:block"
            />
          </Link>

          {/* Right — remaining nav + utilities */}
          <div className="flex flex-1 items-center justify-end gap-5 md:gap-8">
            <nav aria-label="Secondary" className="hidden items-center gap-9 lg:flex">
              {NAV.slice(3).map((item) => (
                <NavLink key={item.href} {...item} pathname={pathname} />
              ))}
            </nav>

            <Link
              href="/wishlist"
              className="eyebrow link-quiet hidden text-espresso md:inline-block"
            >
              Wishlist{ready && wishlist.length > 0 ? ` (${wishlist.length})` : ''}
            </Link>

            <button
              type="button"
              onClick={openBag}
              className="eyebrow link-quiet text-espresso"
            >
              Bag{ready && count > 0 ? ` (${count})` : ''}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 lg:hidden ${
          menuOpen ? '' : 'pointer-events-none'
        }`}
        inert={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-espresso/30 transition-opacity duration-500 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-x-0 top-20 origin-top border-b bg-ivory transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] md:top-24 ${
            menuOpen
              ? 'rule translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-3 border-transparent opacity-0'
          }`}
        >
          <nav className="shell flex flex-col py-4" aria-label="Mobile">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="rule-soft display-sm border-b py-5 text-espresso last:border-0"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/wishlist" className="eyebrow py-6 text-rosewood">
              Wishlist{ready && wishlist.length > 0 ? ` (${wishlist.length})` : ''}
            </Link>
          </nav>
          <div className="shell flex justify-center pb-8">
            <Monogram tone="espresso" width={46} className="opacity-25" />
          </div>
        </div>
      </div>
    </>
  )
}

function NavLink({
  href,
  label,
  pathname,
}: {
  href: string
  label: string
  pathname: string
}) {
  const active = pathname === href || pathname.startsWith(`${href}/`)
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`eyebrow link-quiet text-espresso ${active ? 'link-drawn' : ''}`}
    >
      {label}
    </Link>
  )
}
