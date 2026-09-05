import type { MetadataRoute } from 'next'
import { ALLOW_INDEXING, SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  // While the catalogue is placeholder data, keep every crawler out.
  if (!ALLOW_INDEXING) {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/wishlist'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
