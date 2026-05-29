import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bbd-green': '#00A432',
        'bbd-olive': '#8D844E',
        'bbd-black': '#1E1E1E',
      },
      fontFamily: {
        sans: ['var(--font-ibm-plex-sans)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        section: '9rem',
        'section-mobile': '5rem',
      },
    },
  },
  plugins: [],
}

export default config
