import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/wishlist'] }],
    sitemap: 'https://nesshouseofscents.com/sitemap.xml',
  }
}
