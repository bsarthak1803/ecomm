/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //when using external url
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
        pathname: '/product-images/**',
      },
    ],
  },
}

module.exports = nextConfig
