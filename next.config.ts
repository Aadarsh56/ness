import type { NextConfig } from 'next'
import { ALLOW_INDEXING } from './src/lib/site'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // All brand imagery is local and already optimised at source.
    formats: ['image/avif', 'image/webp'],
  },

  // While the site is a private preview, send noindex as a header as well as
  // in the page metadata. The header also covers non-HTML responses (images,
  // sitemap.xml), which a <meta> tag cannot reach.
  async headers() {
    if (ALLOW_INDEXING) return []
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, noimageindex',
          },
        ],
      },
    ]
  },
}

export default nextConfig
