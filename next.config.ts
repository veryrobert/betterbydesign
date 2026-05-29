import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Apply basePath automatically when building on GitHub Actions
  basePath: process.env.GITHUB_ACTIONS ? '/betterbydesign' : (process.env.NEXT_PUBLIC_BASE_PATH ?? ''),
}

export default nextConfig
