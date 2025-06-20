/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['via.placeholder.com', 'images.unsplash.com'],
    unoptimized: true, // Required for static HTML export
  },
  // GitHub Pages configuration
  // If deploying to gaganmanku96.github.io (user/org site), no basePath needed
  // If deploying to gaganmanku96.github.io/repository-name, use basePath
  basePath: '',
  assetPrefix: '',
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
}

module.exports = nextConfig
