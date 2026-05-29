import Link from 'next/link'
import Header from '@/components/Header'

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="min-h-screen flex flex-col items-start justify-center page-x"
        style={{ paddingTop: '56px' }}
      >
        <p
          className="font-normal text-bbd-black leading-none"
          style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', letterSpacing: '-0.03em' }}
          aria-label="Page not found"
        >
          404
        </p>
        <p className="mt-6 text-bbd-black" style={{ fontSize: '18px' }}>
          Page not found.
        </p>
        <Link
          href="/"
          className="mt-6 underline decoration-1 underline-offset-[0.15em] hover:decoration-2 transition-all duration-200 text-bbd-black"
          style={{ fontSize: '18px' }}
        >
          Return home
        </Link>
      </main>
    </>
  )
}
