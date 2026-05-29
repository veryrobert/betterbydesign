'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main
      id="main-content"
      className="min-h-screen flex flex-col items-start justify-center page-x"
      style={{ paddingTop: '56px' }}
    >
      <p className="text-bbd-black font-semibold" style={{ fontSize: '24px' }}>
        Something went wrong.
      </p>
      <button
        onClick={reset}
        className="mt-6 underline decoration-1 underline-offset-[0.15em] hover:decoration-2 transition-all duration-200 text-bbd-black"
        style={{ fontSize: '18px' }}
      >
        Try again
      </button>
    </main>
  )
}
