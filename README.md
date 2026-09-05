# Ness — House of Scents

A premium fine-fragrance storefront, built as a polished front-end prototype.
No backend, no payment flow: the bag and wishlist work and persist locally, but
nothing can be ordered, and every page says so.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

---

## 1. Brand foundation

Everything visual is derived from the supplied artwork in `brand-assets/`
(the original PNGs, untouched). Nothing about the identity was invented.

**Palette** — sampled pixel-for-pixel from the swatch bar in the brand sheet:

| Token | Hex | Use |
| --- | --- | --- |
| `ink` | `#000000` | The Bespoke hero only |
| `espresso` | `#330A0A` | Body text, footer, dark sections |
| `burgundy` | `#5A0A0A` | Hero panel, final CTA, accents |
| `rosewood` | `#5B3A3A` | Secondary text, Layering section |
| `ivory` | `#FFFBEC` | Page ground |
| `paper` | `#FFFFFF` | Labels |

Two tints (`ivory-deep`, `rosewood-mist`) are lightened from the above so
alternating sections read apart. No hue outside this set is used anywhere.

**Type** — chosen against the lockup: **Cormorant Garamond** for the display
voice (the high-contrast Didone of the "Ness" wordmark) and **Jost** for UI and
body (the quiet grotesque of "A HOUSE OF SCENTS").

**The logo** is the "Ness" wordmark with `HOUSE OF SCENTS` set beneath it —
`<Wordmark>`. The swirl is **not** part of it.

**The monogram** (`<Monogram>`) is a separate mark — an abstract N, not an
infinity symbol — used as the recurring house signature: as the section divider
(`MonogramRule`), as a full-bleed texture wash (`MonogramWash`), as an oversized
watermark in the footer and dark sections, on every product cap and label, in
the empty bag, on the 404, and as the favicon. It sits beside or beneath the
lockup, never inside it.

### Asset generations

`brand-assets/` holds both sets of supplied artwork, untouched:

- **`v2/`** — current. Name is **Ness**, tagline **HOUSE OF SCENTS**, and the
  swirl is a standalone monogram rather than nested in the wordmark. This is
  what the site is built on.
- **`v1-atelier/`** — superseded. The earlier "Ness Atelier / A HOUSE OF
  SCENTS" lockup, kept for reference only. Nothing reads from it.

### What was done to the artwork, and why

The supplied lockups are 2000×2000 squares with a **baked-in flat background**,
and in several files the palette swatch bar sits alongside. No supplied file
has an alpha channel, so none of them can sit in a responsive header.

Rather than redraw anything, both marks were **extracted from the originals**
and given an alpha channel derived from luminance — this removes the flat
ground while preserving the artwork and its anti-aliasing exactly:

| Output | Source | Native size |
| --- | --- | --- |
| `wordmark-{espresso,ivory,ink,burgundy}.png` | `v2/1.png` | 1008 × 556 |
| `monogram-{espresso,ivory,ink,burgundy}.png` | `v2/20.png` | 1560 × 972 |

Colour is never applied with CSS filters — each colourway is a separate file
rendered at extraction time from the brand palette.

`public/brand/` also holds the v2 originals under semantic names
(`flacon.png`, `texture-{ivory,rosewood,burgundy,black,espresso}.png`,
`stacked-*.png`, `lockup-*.png`), plus a generated `og-default.png` share card
and the app icons.

`v2/21.png` is a hand-drawn concept sketch, not production art, and is not used
on the site.

---

## 2. Product imagery is a placeholder

There is no photography yet. `src/components/Flacon.tsx` reproduces the flacon
and cap from the supplied packaging design (`brand-assets/v2/18.png`) as
scalable SVG, tinted per composition so the catalogue reads as one family. The
label carries the real wordmark, and the monogram is struck into the cap and
below the label exactly as on the packaging. Discovery sets render as vials
from the same component.

**To replace with photography:** set `photo` on the product and render an
`<Image>` in place of `<Flacon>`. Nothing else depends on it.

---

## 3. The catalogue is placeholder data

Per the brief, no final fragrance names, formulas, prices, availability,
reviews or performance claims were invented.

Everything lives in **`src/data/products.ts`** — the single file to edit.

- Fragrances are referenced by a house number (`N°01`…`N°08`) and titled by
  the **accord direction** the brief listed as under exploration. The reference
  stays stable once real names are chosen.
- Prices are placeholders in **INR**. Change `CURRENCY` (one constant) to switch.
  A `price` of `null` renders as "Price on launch" everywhere automatically.
- No reviews, ratings, longevity or projection claims appear anywhere on the
  site. The FAQ explicitly declines to publish longevity figures.
- Product JSON-LD is emitted with `availability: PreOrder` — never `InStock`,
  because nothing can be bought.

**Adding a product** is one entry in `PRODUCTS`. The shop grid, filters,
sitemap, static params, layering suggestions and bag all read from it.

### Launch vs. later formats

`FORMATS` marks each format `live` or `coming-soon`. Only `live` formats appear
in the filter rail and can be added to the bag. EDT, extrait, hair mist,
roll-on, solid and bespoke are listed on the shop page as "in development",
clearly not purchasable.

---

## 4. Pages

| Route | What it is |
| --- | --- |
| `/` | Hero → featured → collection → discovery → layering → story → CTA |
| `/shop` | Grid with URL-driven format filters (`?format=edp`) |
| `/product/[slug]` | Imagery, sizes, price, notes pyramid, character, layering, shipping |
| `/discovery` | Six-question scent quiz with transparent, shown reasoning |
| `/layering` | The method, six composed pairs |
| `/the-house` | Brand story and the meaning of the monogram |
| `/bespoke` | Future-facing commission page, editorial, enquiry form |
| `/wishlist` | Locally saved items |
| `/faq`, `/shipping-returns`, `/contact` | Client care; unfinished policy is flagged, not guessed |

Filters are links, not client state, so every category is a crawlable URL.
An unknown or not-yet-live `format` falls back to the full collection.

---

## 5. Notes on the build

- **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4.**
  Design tokens are CSS custom properties in `src/app/globals.css`.
- **Animation** is one primitive, `Reveal`. It reveals anything already in or
  scrolled past the viewport, so a deep link, a restored scroll position or a
  fast flick can never leave content stuck invisible; `prefers-reduced-motion`,
  `@media print` and a `<noscript>` block all disable it outright.
- **Accessibility:** audited with axe-core (WCAG 2.1 A/AA) across every page
  plus the open bag, open mobile menu and quiz result — zero violations. All
  text meets AA contrast; closed drawers use `inert` so they leave the tab
  order; there is a skip link, and focus rings are styled, never removed.
- **SEO:** per-page metadata, canonicals, Open Graph, Organization and Product
  JSON-LD, `sitemap.xml` and `robots.txt`. Set the real domain in `SITE`
  (`src/app/layout.tsx`, `sitemap.ts`, `robots.ts`) before launch.
- **Store:** `StoreProvider` holds bag + wishlist in `localStorage`, guarded so
  blocked storage degrades to in-memory rather than throwing.

### Search indexing

The site ships **blocked from search engines**, because the catalogue is
placeholder data. Three layers enforce it: `robots.txt`, the `robots` meta tag,
and an `X-Robots-Tag` response header (which also covers images and
`sitemap.xml`).

To go public, set `ALLOW_INDEXING=true` in the environment and redeploy. The
flag lives in `src/lib/site.ts`, which is also the single source for `SITE_URL`.

### Before going live

1. Real fragrance names, notes and prices in `src/data/products.ts`.
2. Product photography, replacing `<Flacon>`.
3. `ALLOW_INDEXING=true`, once the catalogue is real.
4. Shipping, returns, contact and testing policy copy — each currently marked
   as unresolved rather than invented.
5. A commerce backend. Checkout is deliberately disabled, not stubbed.
