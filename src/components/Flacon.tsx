import type { Product } from '@/data/products'

/* ---------------------------------------------------------------------------
 * PLACEHOLDER PRODUCT IMAGERY.
 *
 * There is no product photography yet. This reproduces the flacon and cap
 * from the supplied packaging design (brand-assets/v2/18.png) as scalable
 * vector, tinted per composition so the catalogue reads as a family. The
 * label carries the real monogram and lockup artwork.
 *
 * When photography exists, set `photo` on the product and render an <Image>
 * instead — no other component needs to change.
 * ------------------------------------------------------------------------- */

function shade(hex: string, amount: number): string {
  const clean = hex.replace('#', '')
  const num = parseInt(
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean,
    16,
  )
  const chan = [(num >> 16) & 255, (num >> 8) & 255, num & 255].map((c) => {
    const next = amount >= 0 ? c + (255 - c) * amount : c * (1 + amount)
    return Math.max(0, Math.min(255, Math.round(next)))
  })
  return `#${chan.map((c) => c.toString(16).padStart(2, '0')).join('')}`
}

const CAP = '#330a0a' // House cap — constant across the collection.

function Bottle({ juice, idPrefix }: { juice: string; idPrefix: string }) {
  const front = juice
  const side = shade(juice, -0.34)
  const top = shade(juice, 0.16)
  const capSide = shade(CAP, -0.3)
  const capTop = shade(CAP, 0.18)

  return (
    <>
      {/* Box: drawn back-to-front — top bevel, right face, then front face.
          Everything above shares the same isometric offset so the cap, neck
          and body read as one object. */}
      <polygon points="60,152 100,114 340,114 300,152" fill={top} />
      <polygon points="300,152 340,114 340,524 300,562" fill={side} />
      <rect x="60" y="152" width="240" height="410" fill={front} />

      {/* Neck and cap sit on the top face, so both are centred on its
          centroid (x=200) rather than on the front face. As in the packaging
          design they read as flat silhouettes — the box carries the depth. */}
      <polygon points="150,84 250,84 264,140 136,140" fill={CAP} />
      <rect x="124" y="22" width="152" height="62" rx="30" fill={CAP} />
      <rect
        x="136"
        y="30"
        width="12"
        height="46"
        rx="6"
        fill={capTop}
        opacity="0.5"
      />
      {/* Monogram struck into the cap, as on the packaging */}
      <image
        href="/brand/monogram-ivory.png"
        x="176"
        y="40"
        width="48"
        height="30"
        opacity="0.9"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Label */}
      <rect x="92" y="238" width="176" height="212" fill="#fffbec" />
      <image
        href="/brand/wordmark-espresso.png"
        x="112"
        y="258"
        width="136"
        height="75"
        preserveAspectRatio="xMidYMid meet"
      />
      <image
        href="/brand/monogram-espresso.png"
        x="106"
        y="348"
        width="148"
        height="93"
        opacity="0.16"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Monogram struck below the label, as on the packaging */}
      <image
        href="/brand/monogram-ivory.png"
        x="148"
        y="482"
        width="64"
        height="40"
        opacity="0.85"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Glass highlight down the left edge */}
      <rect
        x="60"
        y="152"
        width="26"
        height="410"
        fill={`url(#${idPrefix}-sheen)`}
      />
    </>
  )
}

function Vials({
  juice,
  count,
  onDark,
}: {
  juice: string
  count: number
  onDark: boolean
}) {
  // Vial caps sit against the panel, not against the glass, so on a dark
  // ground the espresso cap would vanish. Use the ivory colourway instead.
  const capFill = onDark ? '#efe6d2' : CAP

  // Sized from the count so the set fills the same canvas as a single flacon,
  // rather than sitting small in the middle of it.
  const cols = Math.min(count, 4)
  const rows = Math.ceil(count / cols)
  const gap = 24
  const w = Math.min(78, (340 - gap * (cols - 1)) / cols)
  const capH = Math.round(w * 0.42)
  const bodyH = rows === 1 ? 300 : 200
  const rowH = bodyH + capH + 40

  const totalW = cols * w + (cols - 1) * gap
  const startX = 200 - totalW / 2
  const startY = 310 - (rows * rowH - 40) / 2

  const labelH = Math.round(bodyH * 0.3)

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        const x = startX + col * (w + gap)
        const y = startY + row * rowH
        const bodyY = y + capH
        const labelY = bodyY + (bodyH - labelH) / 2

        return (
          <g key={i}>
            {/* Glass */}
            <rect x={x} y={bodyY} width={w} height={bodyH} fill={juice} />
            <rect
              x={x + 5}
              y={bodyY}
              width={Math.round(w * 0.13)}
              height={bodyH}
              fill="#ffffff"
              opacity="0.16"
            />
            {/* Cap */}
            <rect
              x={x + w * 0.2}
              y={y}
              width={w * 0.6}
              height={capH}
              rx={Math.round(capH * 0.22)}
              fill={capFill}
            />
            {/* Label */}
            <rect
              x={x + 6}
              y={labelY}
              width={w - 12}
              height={labelH}
              fill="#fffbec"
            />
            <image
              href="/brand/monogram-espresso.png"
              x={x + 10}
              y={labelY + labelH * 0.24}
              width={w - 20}
              height={labelH * 0.52}
              opacity="0.55"
              preserveAspectRatio="xMidYMid meet"
            />
          </g>
        )
      })}
    </>
  )
}

export function Flacon({
  product,
  className = '',
}: {
  product: Product
  className?: string
}) {
  const idPrefix = `fl-${product.slug}`
  const juice = product.art.juice
  const isSet = product.kind === 'set'
  const vialCount = isSet
    ? Number(product.variants[0]?.sku.split('-').pop()) || 4
    : 0

  return (
    <svg
      viewBox="0 0 400 620"
      role="img"
      aria-label={`${product.reference} — ${product.title}`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`${idPrefix}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${idPrefix}-shadow`}>
          <stop offset="0%" stopColor="#330a0a" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#330a0a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse
        cx="200"
        cy="576"
        rx="150"
        ry="20"
        fill={`url(#${idPrefix}-shadow)`}
      />

      {isSet ? (
        <Vials juice={juice} count={vialCount} onDark={product.art.onDark} />
      ) : (
        <Bottle juice={juice} idPrefix={idPrefix} />
      )}
    </svg>
  )
}
