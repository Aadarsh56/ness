import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BagDrawer } from '@/components/BagDrawer'
import { StoreProvider } from '@/components/StoreProvider'

/**
 * Type pairing chosen against the supplied lockup: a high-contrast Didone
 * serif for the display voice (matching the "Ness" wordmark) and a quiet
 * geometric grotesque for UI and body, echoing "HOUSE OF SCENTS".
 */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

const SITE = 'https://nesshouseofscents.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Ness — House of Scents',
    template: '%s — Ness',
  },
  description:
    'Ness is a contemporary house of scents. Eau de parfum, travel sizes, discovery sets, body mists and perfume oils — composed to be layered and made personal.',
  keywords: [
    'Ness',
    'house of scents',
    'eau de parfum',
    'fragrance layering',
    'discovery set',
    'perfume oil',
    'contemporary fragrance',
  ],
  applicationName: 'Ness',
  openGraph: {
    type: 'website',
    siteName: 'Ness',
    title: 'Ness — House of Scents',
    description:
      'A contemporary house of scents. Composed to be layered, and made personal.',
    url: SITE,
    images: [
      {
        url: '/brand/og-default.png',
        width: 1200,
        height: 1200,
        alt: 'Ness — House of Scents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ness — House of Scents',
    description:
      'A contemporary house of scents. Composed to be layered, and made personal.',
    images: ['/brand/og-default.png'],
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#fffbec',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        {/* Scroll reveals are a progressive enhancement — without JS the
            content must still be visible. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen antialiased">
        <StoreProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <BagDrawer />
        </StoreProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Ness',
              alternateName: 'Ness — House of Scents',
              url: SITE,
              logo: `${SITE}/brand/wordmark-espresso.png`,
              slogan: 'House of Scents',
              description:
                'A contemporary house of scents composing fine fragrance to be layered and made personal.',
            }),
          }}
        />
      </body>
    </html>
  )
}
