import type { MetadataRoute } from 'next'
import { LIVE_FORMATS, PRODUCTS } from '@/data/products'

const SITE = 'https://nesshouseofscents.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE, priority: 1, changeFrequency: 'weekly' },
    { url: `${SITE}/shop`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${SITE}/discovery`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${SITE}/layering`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${SITE}/the-house`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${SITE}/bespoke`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${SITE}/faq`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${SITE}/shipping-returns`, priority: 0.4, changeFrequency: 'monthly' },
    { url: `${SITE}/contact`, priority: 0.4, changeFrequency: 'monthly' },
  ]

  const formatPages: MetadataRoute.Sitemap = LIVE_FORMATS.map((f) => ({
    url: `${SITE}/shop?format=${f.id}`,
    priority: 0.6,
    changeFrequency: 'weekly' as const,
  }))

  const productPages: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${SITE}/product/${p.slug}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }))

  return [...staticPages, ...formatPages, ...productPages].map((entry) => ({
    ...entry,
    lastModified: now,
  }))
}
