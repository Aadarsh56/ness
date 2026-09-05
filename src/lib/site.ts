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

export const SITE_URL = 'https://nesshouseofscents.com'

export const SITE_NAME = 'Ness'
export const SITE_TAGLINE = 'House of Scents'

export const ALLOW_INDEXING = process.env.ALLOW_INDEXING === 'true'
