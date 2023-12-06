/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'kuyawa.net',
        port: '',
        pathname: '/media/**'
      },
      {
        protocol: 'https',
        hostname: 'kuyawa.net',
        port: '',
        pathname: '/media/**'
      }
    ]
  }
}

module.exports = nextConfig
