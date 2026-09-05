import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // All brand imagery is local and already optimised at source.
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
