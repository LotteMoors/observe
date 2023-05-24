/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost', 'plant-id.ams3.cdn.digitaloceanspaces.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'plant-id.ams3.cdn.digitaloceanspaces.com',
        port: '',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_PLANT_API_KEY: process.env.NEXT_PUBLIC_PLANT_API_KEY,
    NEXT_PUBLIC_INSECT_API_KEY: process.env.NEXT_PUBLIC_INSECT_API_KEY,
    NEXT_PUBLIC_MUSHROOM_KEY: process.env.NEXT_PUBLIC_MUSHROOM_KEY,
  },
};

// module.exports = nextConfig;

// const withPWA = require('next-pwa')({
//   dest: 'public',
//   disable: process.env.NODE_ENV === 'development',
// })


module.exports = nextConfig
