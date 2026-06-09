import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Better By Design 2026',
    short_name: 'Better By Design',
    description: 'Public Service Design — Conference & Showcase. Thursday 18 June 2026, The Lighthouse, Dublin.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1E1E1E',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
