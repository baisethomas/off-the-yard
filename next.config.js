/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbo mode for faster compilation
  ...(process.env.TURBOPACK && {
    experimental: {
      turbo: {},
    },
  }),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: 'westwardx.com',
      },
      {
        protocol: 'https',
        hostname: 'www.hhnalia.com',
      },
      {
        protocol: 'https',
        hostname: 'thatsowt.com',
      },
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com',
      },
    ],
  },
}

module.exports = nextConfig

