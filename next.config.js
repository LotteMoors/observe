/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_PLANT_API_KEY: process.env.NEXT_PUBLIC_PLANT_API_KEY,
        NEXT_PUBLIC_INSECT_API_KEY: process.env.NEXT_PUBLIC_INSECT_API_KEY,
        NEXT_PUBLIC_MUSHROOM_KEY: process.env.NEXT_PUBLIC_MUSHROOM_KEY,
      },
}

module.exports = nextConfig
