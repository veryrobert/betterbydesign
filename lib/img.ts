// Prefix an image path with the basePath so static-exported images resolve
// correctly on GitHub Pages (next/image with unoptimized:true does not apply
// basePath automatically in static export mode).
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
export const img = (path: string) => `${BASE}/${path.replace(/^\//, '')}`
