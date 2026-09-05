/* ============================================================================
 * NESS — product catalogue
 * ----------------------------------------------------------------------------
 * EVERYTHING IN THIS FILE IS PLACEHOLDER DATA.
 *
 * The first collection is not finalised. Per the brief, no final fragrance
 * names, formulas, prices, availability, reviews or performance claims have
 * been invented. Each fragrance is referenced by a house number (N°01…)
 * and described by the accord direction it is being explored under.
 *
 * To go live, replace: `title`, `variants[].price`, `status`, `notes`, and
 * point `photo` at real photography. Nothing else needs to change — every
 * page reads from this file.
 * ========================================================================== */

export const CATALOGUE_IS_PLACEHOLDER = true

/** Single place to change currency. */
export const CURRENCY = { code: 'INR', symbol: '₹', locale: 'en-IN' } as const

export function formatPrice(value: number | null): string {
  if (value === null) return 'Price on launch'
  return `${CURRENCY.symbol}${value.toLocaleString(CURRENCY.locale)}`
}

/* ---------------------------------------------------------------- formats */

export type FormatId =
  | 'edp'
  | 'travel'
  | 'discovery'
  | 'body-mist'
  | 'perfume-oil'
  | 'layering'
  | 'edt'
  | 'extrait'
  | 'hair-mist'
  | 'roll-on'
  | 'solid'
  | 'bespoke'

export interface FormatDef {
  id: FormatId
  label: string
  /** Shown on the shop filter rail and category headers. */
  blurb: string
  /** Only `live` formats may be added to the bag. */
  status: 'live' | 'coming-soon'
}

/** Launch order. Filters render in this sequence. */
export const FORMATS: FormatDef[] = [
  {
    id: 'edp',
    label: 'Eau de Parfum',
    blurb: 'The house signature. Concentrated, long-wearing, built to be worn close.',
    status: 'live',
  },
  {
    id: 'travel',
    label: 'Travel',
    blurb: 'The 10ml refillable. A full fragrance, folded into a pocket.',
    status: 'live',
  },
  {
    id: 'discovery',
    label: 'Discovery Sets',
    blurb: 'The whole house in miniature. The most honest way to find yours.',
    status: 'live',
  },
  {
    id: 'body-mist',
    label: 'Body Mist',
    blurb: 'Lighter, closer to the skin. Made to be layered without weight.',
    status: 'live',
  },
  {
    id: 'perfume-oil',
    label: 'Perfume Oil',
    blurb: 'Alcohol-free and worn on pulse points. Quiet, warm, slow to leave.',
    status: 'live',
  },
  {
    id: 'layering',
    label: 'Layering',
    blurb: 'Pairs chosen to be worn together, not instead of one another.',
    status: 'live',
  },
  { id: 'edt', label: 'Eau de Toilette', blurb: 'In development.', status: 'coming-soon' },
  { id: 'extrait', label: 'Extrait de Parfum', blurb: 'In development.', status: 'coming-soon' },
  { id: 'hair-mist', label: 'Hair Mist', blurb: 'In development.', status: 'coming-soon' },
  { id: 'roll-on', label: 'Roll-on', blurb: 'In development.', status: 'coming-soon' },
  { id: 'solid', label: 'Solid Perfume', blurb: 'In development.', status: 'coming-soon' },
  { id: 'bespoke', label: 'Bespoke', blurb: 'By appointment.', status: 'coming-soon' },
]

export const LIVE_FORMATS = FORMATS.filter((f) => f.status === 'live')

export function getFormat(id: FormatId): FormatDef {
  const found = FORMATS.find((f) => f.id === id)
  if (!found) throw new Error(`Unknown format: ${id}`)
  return found
}

/* --------------------------------------------------------------- taxonomy */

export type ScentFamily =
  | 'Floral'
  | 'Woody'
  | 'Gourmand'
  | 'Amber'
  | 'Fresh'
  | 'Musk'

export interface Variant {
  /** Human label, e.g. "50 ml". */
  size: string
  ml: number
  /** null renders as “Price on launch”. Replace with real pricing. */
  price: number | null
  format: FormatId
  sku: string
  inStock: boolean
}

export interface Product {
  slug: string
  kind: 'fragrance' | 'set'
  /** House reference, e.g. "N°01". Stable even when names are finalised. */
  reference: string
  /** PLACEHOLDER working title — replace at launch. */
  title: string
  /** The accord direction being explored. */
  accord: string[]
  family: ScentFamily
  /** One-line editorial hook used on cards. */
  tagline: string
  description: string
  notes: { top: string[]; heart: string[]; base: string[] }
  /** Editorial descriptors, not performance claims. */
  mood: string[]
  /** 1–5, relative within the house only. */
  intensity: number
  formats: FormatId[]
  variants: Variant[]
  /** Slugs this is composed to be worn with. */
  layersWith: string[]
  status: 'available' | 'coming-soon'
  /**
   * Placeholder art direction. `juice` tints the generated flacon, `panel`
   * sets the card backdrop. Swap for real photography via `photo`.
   */
  art: { juice: string; panel: string; onDark: boolean }
  photo?: string
}

/* --------------------------------------------------------------- products */

const V = (
  size: string,
  ml: number,
  price: number | null,
  format: FormatId,
  sku: string,
  inStock = true,
): Variant => ({ size, ml, price, format, sku, inStock })

export const PRODUCTS: Product[] = [
  {
    slug: 'n01',
    kind: 'fragrance',
    reference: 'N°01',
    title: 'Pear, Peony & White Musk',
    accord: ['Pear', 'Peony', 'White Musk'],
    family: 'Floral',
    tagline: 'Clean, fresh, quietly pretty.',
    description:
      'The lightest thing the house makes. Cold pear opening onto peony, resolving into a musk that reads more like clean skin than perfume. Composed for people who want to be noticed at close range and nowhere else.',
    notes: {
      top: ['Pear', 'Bergamot'],
      heart: ['Peony', 'Freesia'],
      base: ['White Musk', 'Blond Woods'],
    },
    mood: ['Daylight', 'Understated', 'Everyday'],
    intensity: 2,
    formats: ['edp', 'travel', 'body-mist', 'layering'],
    variants: [
      V('10 ml', 10, 1450, 'travel', 'N01-EDP-10'),
      V('50 ml', 50, 4200, 'edp', 'N01-EDP-50'),
      V('100 ml', 100, 6400, 'edp', 'N01-EDP-100'),
      V('150 ml', 150, 1900, 'body-mist', 'N01-MST-150'),
    ],
    layersWith: ['n03', 'n06'],
    status: 'available',
    art: { juice: '#e8d9c8', panel: '#f2ece0', onDark: false },
  },
  {
    slug: 'n02',
    kind: 'fragrance',
    reference: 'N°02',
    title: 'Fig, Neroli & Sandalwood',
    accord: ['Fig', 'Neroli', 'Sandalwood'],
    family: 'Woody',
    tagline: 'Skin-like, effortless, unisex.',
    description:
      'Green fig and the bitterness under neroli, laid over sandalwood. It behaves less like a fragrance and more like a temperature — the reason people stand slightly closer without deciding to.',
    notes: {
      top: ['Fig Leaf', 'Green Mandarin'],
      heart: ['Neroli', 'Orange Flower'],
      base: ['Sandalwood', 'Cedar', 'Soft Musk'],
    },
    mood: ['Unisex', 'Warm-neutral', 'All day'],
    intensity: 3,
    formats: ['edp', 'travel', 'perfume-oil', 'layering'],
    variants: [
      V('10 ml', 10, 1450, 'travel', 'N02-EDP-10'),
      V('50 ml', 50, 4200, 'edp', 'N02-EDP-50'),
      V('100 ml', 100, 6400, 'edp', 'N02-EDP-100'),
      V('8 ml', 8, 2100, 'perfume-oil', 'N02-OIL-08'),
    ],
    layersWith: ['n08', 'n05'],
    status: 'available',
    art: { juice: '#cbbfa4', panel: '#ebe6d6', onDark: false },
  },
  {
    slug: 'n03',
    kind: 'fragrance',
    reference: 'N°03',
    title: 'Tobacco, Vanilla & Tonka',
    accord: ['Tobacco', 'Vanilla', 'Tonka'],
    family: 'Gourmand',
    tagline: 'Warm, creamy, addictive.',
    description:
      'Cured tobacco leaf softened with vanilla and tonka until the smoke turns sweet. The house’s most enveloping composition — worn in cold air, in the evening, in a coat.',
    notes: {
      top: ['Bergamot', 'Pink Pepper'],
      heart: ['Tobacco Leaf', 'Cinnamon'],
      base: ['Vanilla', 'Tonka Bean', 'Benzoin'],
    },
    mood: ['Evening', 'Enveloping', 'Cold weather'],
    intensity: 5,
    formats: ['edp', 'travel', 'perfume-oil', 'layering'],
    variants: [
      V('10 ml', 10, 1650, 'travel', 'N03-EDP-10'),
      V('50 ml', 50, 4800, 'edp', 'N03-EDP-50'),
      V('100 ml', 100, 7200, 'edp', 'N03-EDP-100'),
      V('8 ml', 8, 2400, 'perfume-oil', 'N03-OIL-08'),
    ],
    layersWith: ['n01', 'n05'],
    status: 'available',
    art: { juice: '#5a3218', panel: '#3d1a12', onDark: true },
  },
  {
    slug: 'n04',
    kind: 'fragrance',
    reference: 'N°04',
    title: 'Cherry, Rose & Amber',
    accord: ['Cherry', 'Rose', 'Amber'],
    family: 'Amber',
    tagline: 'Sensual, after dark.',
    description:
      'Black cherry against a rose that has been allowed to go slightly overripe, set on amber. The most deliberately sensual thing in the house, and the least polite.',
    notes: {
      top: ['Black Cherry', 'Bitter Almond'],
      heart: ['Turkish Rose', 'Plum'],
      base: ['Amber', 'Labdanum', 'Vanilla'],
    },
    mood: ['Evening', 'Sensual', 'Statement'],
    intensity: 5,
    formats: ['edp', 'travel', 'layering'],
    variants: [
      V('10 ml', 10, 1650, 'travel', 'N04-EDP-10'),
      V('50 ml', 50, 4800, 'edp', 'N04-EDP-50'),
      V('100 ml', 100, 7200, 'edp', 'N04-EDP-100'),
    ],
    layersWith: ['n07', 'n03'],
    status: 'available',
    art: { juice: '#6d0f14', panel: '#3f0707', onDark: true },
  },
  {
    slug: 'n05',
    kind: 'fragrance',
    reference: 'N°05',
    title: 'Pistachio, Almond & Caramel',
    accord: ['Pistachio', 'Almond', 'Caramel', 'Vanilla'],
    family: 'Gourmand',
    tagline: 'A gourmand with restraint.',
    description:
      'Roasted pistachio and almond over salted caramel and vanilla, kept dry so it never turns into dessert. Sweet, but composed — the difference between a gourmand and a confection.',
    notes: {
      top: ['Almond', 'Salt'],
      heart: ['Pistachio', 'Caramel'],
      base: ['Vanilla', 'Tonka', 'Sandalwood'],
    },
    mood: ['Comforting', 'Close', 'Autumn'],
    intensity: 4,
    formats: ['edp', 'travel', 'perfume-oil', 'body-mist', 'layering'],
    variants: [
      V('10 ml', 10, 1650, 'travel', 'N05-EDP-10'),
      V('50 ml', 50, 4800, 'edp', 'N05-EDP-50'),
      V('100 ml', 100, 7200, 'edp', 'N05-EDP-100'),
      V('8 ml', 8, 2400, 'perfume-oil', 'N05-OIL-08'),
      V('150 ml', 150, 1900, 'body-mist', 'N05-MST-150'),
    ],
    layersWith: ['n03', 'n02'],
    status: 'available',
    art: { juice: '#c9a97a', panel: '#e6dcc6', onDark: false },
  },
  {
    slug: 'n06',
    kind: 'fragrance',
    reference: 'N°06',
    title: 'Jasmine, Tuberose & Sandalwood',
    accord: ['Jasmine', 'Tuberose', 'Sandalwood'],
    family: 'Floral',
    tagline: 'A white floral with a spine.',
    description:
      'Jasmine and tuberose at full volume, grounded on sandalwood so the whole thing keeps its shape. A classical white floral, built for someone who does not want it to be shy.',
    notes: {
      top: ['Green Jasmine', 'Bergamot'],
      heart: ['Tuberose', 'Ylang-Ylang'],
      base: ['Sandalwood', 'Creamy Musk'],
    },
    mood: ['Evening', 'Floral', 'Occasion'],
    intensity: 4,
    formats: ['edp', 'travel', 'layering'],
    variants: [
      V('10 ml', 10, 1650, 'travel', 'N06-EDP-10'),
      V('50 ml', 50, 4800, 'edp', 'N06-EDP-50'),
      V('100 ml', 100, 7200, 'edp', 'N06-EDP-100'),
    ],
    layersWith: ['n01', 'n08'],
    status: 'available',
    art: { juice: '#efe4d0', panel: '#efe8e4', onDark: false },
  },
  {
    slug: 'n07',
    kind: 'fragrance',
    reference: 'N°07',
    title: 'Saffron, Rose, Oud & Amber',
    accord: ['Saffron', 'Rose', 'Oud', 'Amber'],
    family: 'Amber',
    tagline: 'Dark, rich, deliberate.',
    description:
      'Saffron over rose, oud underneath, amber holding it together. The heaviest composition in the house and the one that asks the most of whoever wears it.',
    notes: {
      top: ['Saffron', 'Pink Pepper'],
      heart: ['Damask Rose', 'Leather'],
      base: ['Oud', 'Amber', 'Patchouli'],
    },
    mood: ['Evening', 'Rich', 'Winter'],
    intensity: 5,
    formats: ['edp', 'travel', 'layering'],
    variants: [
      V('10 ml', 10, 1850, 'travel', 'N07-EDP-10'),
      V('50 ml', 50, 5600, 'edp', 'N07-EDP-50'),
      V('100 ml', 100, 8400, 'edp', 'N07-EDP-100'),
    ],
    layersWith: ['n04', 'n08'],
    status: 'available',
    art: { juice: '#3a0f0f', panel: '#5b3a3a', onDark: true },
  },
  {
    slug: 'n08',
    kind: 'fragrance',
    reference: 'N°08',
    title: 'Tea, Cedar, Vetiver & Musk',
    accord: ['Tea', 'Cedar', 'Vetiver', 'Musk'],
    family: 'Woody',
    tagline: 'Quiet luxury, woody, unisex.',
    description:
      'Dry black tea, cedar and vetiver over a transparent musk. The most restrained thing the house makes — closer to a well-cut coat than a fragrance.',
    notes: {
      top: ['Black Tea', 'Bergamot'],
      heart: ['Cedar', 'Violet Leaf'],
      base: ['Vetiver', 'Grey Musk'],
    },
    mood: ['Unisex', 'Office', 'Restrained'],
    intensity: 3,
    formats: ['edp', 'travel', 'perfume-oil', 'layering'],
    variants: [
      V('10 ml', 10, 1450, 'travel', 'N08-EDP-10'),
      V('50 ml', 50, 4200, 'edp', 'N08-EDP-50'),
      V('100 ml', 100, 6400, 'edp', 'N08-EDP-100'),
      V('8 ml', 8, 2100, 'perfume-oil', 'N08-OIL-08'),
    ],
    layersWith: ['n02', 'n06'],
    status: 'available',
    art: { juice: '#b9b39a', panel: '#e2e0d4', onDark: false },
  },

  /* ------------------------------------------------------------ sets ---- */
  {
    slug: 'discovery-the-house',
    kind: 'set',
    reference: 'SET',
    title: 'The House Discovery Set',
    accord: ['Eight 2ml vials'],
    family: 'Fresh',
    tagline: 'All eight compositions. The honest way to choose.',
    description:
      'Every fragrance in the house, at 2ml each, in a case built to be kept. The value of the set is redeemable against a full bottle — because the point of a discovery set is that you leave with the right one.',
    notes: { top: [], heart: [], base: [] },
    mood: ['Gifting', 'First visit'],
    intensity: 3,
    formats: ['discovery'],
    variants: [V('8 × 2 ml', 16, 2400, 'discovery', 'SET-HOUSE-8')],
    layersWith: [],
    status: 'available',
    art: { juice: '#c9a97a', panel: '#5b3a3a', onDark: true },
  },
  {
    slug: 'discovery-the-warm',
    kind: 'set',
    reference: 'SET',
    title: 'The Warm Discovery Set',
    accord: ['Four 2ml vials'],
    family: 'Amber',
    tagline: 'The four darkest compositions in the house.',
    description:
      'N°03, N°04, N°05 and N°07 — tobacco, cherry, gourmand and oud. For anyone who already knows they wear fragrance after dark.',
    notes: { top: [], heart: [], base: [] },
    mood: ['Evening', 'Gifting'],
    intensity: 5,
    formats: ['discovery'],
    variants: [V('4 × 2 ml', 8, 1400, 'discovery', 'SET-WARM-4')],
    layersWith: [],
    status: 'available',
    art: { juice: '#7a1418', panel: '#330a0a', onDark: true },
  },
]

/* ---------------------------------------------------------------- lookups */

export const PRODUCT_MAP = new Map(PRODUCTS.map((p) => [p.slug, p]))

export function getProduct(slug: string): Product | undefined {
  return PRODUCT_MAP.get(slug)
}

export function getProducts(format?: FormatId | 'all'): Product[] {
  if (!format || format === 'all') return PRODUCTS
  return PRODUCTS.filter((p) => p.formats.includes(format))
}

export function getFragrances(): Product[] {
  return PRODUCTS.filter((p) => p.kind === 'fragrance')
}

/** The hero composition on the home page. */
export const FEATURED_SLUG = 'n04'

export function getFeatured(): Product {
  const p = getProduct(FEATURED_SLUG)
  if (!p) throw new Error('FEATURED_SLUG does not resolve')
  return p
}

/** Cheapest listed price across a product's variants, for card display. */
export function fromPrice(product: Product): number | null {
  const prices = product.variants
    .map((v) => v.price)
    .filter((p): p is number => p !== null)
  return prices.length ? Math.min(...prices) : null
}

/* ------------------------------------------------------- layering pairings */

export interface LayeringPair {
  a: string
  b: string
  name: string
  note: string
}

/** Curated pairs surfaced on /layering. Editorial, not prescriptive. */
export const LAYERING_PAIRS: LayeringPair[] = [
  {
    a: 'n01',
    b: 'n03',
    name: 'Cold pear over warm smoke',
    note: 'The musk keeps the tobacco from closing in. Apply N°03 first, N°01 above it.',
  },
  {
    a: 'n02',
    b: 'n08',
    name: 'Two woods, one skin',
    note: 'Fig softens cedar. The most wearable pair in the house and the hardest to place.',
  },
  {
    a: 'n04',
    b: 'n07',
    name: 'Rose doubled',
    note: 'Cherry rose against saffron rose. Heavy on purpose — one spray of each, no more.',
  },
  {
    a: 'n05',
    b: 'n02',
    name: 'Salted almond, green fig',
    note: 'Stops the gourmand from turning sweet. Works best in the hour after a shower.',
  },
  {
    a: 'n06',
    b: 'n01',
    name: 'White flowers, thinned',
    note: 'For anyone who finds tuberose too loud alone. N°01 takes the edge off it.',
  },
  {
    a: 'n08',
    b: 'n03',
    name: 'Tea and tobacco',
    note: 'Dry against sweet. The vetiver reads as the sharpest part of the tobacco.',
  },
]
