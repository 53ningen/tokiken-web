/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-fe.ssl-images-amazon.com',
        pathname: '/images/*/*',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/*',
      },
    ],
  },
}

module.exports = nextConfig
