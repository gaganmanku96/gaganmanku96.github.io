/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['via.placeholder.com', 'images.unsplash.com'],
    unoptimized: true, // Required for static HTML export
  },
  // GitHub Pages configuration for root domain
  // basePath: '/gaganmanku96',
  // assetPrefix: '/gaganmanku96/',
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
}

module.exports = nextConfig
