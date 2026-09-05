/**
 * Single source of truth for site-wide config.
 *
 * Search indexing is OFF unless explicitly enabled, because the catalogue is
 * still placeholder data — invented names, placeholder prices. Letting Google
 * index those now means they linger in results after the real collection
 * launches.
 *
 * To go public at launch, set ALLOW_INDEXING=true in the environment
 * (Vercel → Project → Settings → Environment Variables) and redeploy.
 */

export const ALLOW_INDEXING = process.env.ALLOW_INDEXING === 'true'

/** The domain the brand will actually launch on. */
const LAUNCH_URL = 'https://nesshouseofscents.com'

/**
 * Absolute base for canonical URLs and Open Graph images.
 *
 * While the site is a private preview the launch domain does not resolve yet,
 * so pointing at it would serve a broken share-preview image to anyone the
 * link is sent to. Fall back to the Vercel production URL until either the
 * domain is attached or indexing is switched on.
 *
 * Override at any time with NEXT_PUBLIC_SITE_URL.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')

  if (ALLOW_INDEXING) return LAUNCH_URL

  // Set by Vercel; resolves to the custom domain once one is attached.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  return vercel ? `https://${vercel}` : LAUNCH_URL
}

export const SITE_URL = resolveSiteUrl()

export const SITE_NAME = 'Ness'
export const SITE_TAGLINE = 'House of Scents'
