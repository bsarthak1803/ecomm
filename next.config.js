/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //when using external url
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/img/**',
      },
    ],
  },
}

module.exports = nextConfig
