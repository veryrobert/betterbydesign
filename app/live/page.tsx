import { event } from '@/content/site'
import Link from 'next/link'

export default function LivePage() {
  return (
    <div className="min-h-screen bg-bbd-black flex flex-col text-white">

      {/* Header */}
      <header
        className="page-x flex items-center justify-between flex-shrink-0 border-b border-white/10"
        style={{ height: '56px' }}
      >
        <Link href="/" className="font-semibold text-white hover:opacity-60 transition-opacity" style={{ fontSize: '15px' }}>
          Better By Design
        </Link>
        <span className="text-white/40" style={{ fontSize: '13px' }}>
          {event.date}
        </span>
      </header>

      {/* Video */}
      <main id="main-content" className="flex-1 flex flex-col">
        {event.isLive ? (
          <div className="flex-1 relative" style={{ minHeight: '56.25vw' }}>
            <iframe
              src={event.liveStreamUrl}
              title="Better By Design 2026 — Live Stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        ) : (
          <>
            {/* Video placeholder */}
            <div
              className="w-full bg-white/5 flex items-center justify-center flex-shrink-0"
              style={{ aspectRatio: '16 / 9' }}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white/30 ml-1" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white/30" style={{ fontSize: '13px' }}>Live stream will appear here</p>
              </div>
            </div>

            {/* Coming soon text */}
            <div className="page-x py-10">
              <p className="font-semibold text-white leading-none" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                Better By Design
              </p>
              <p className="font-light text-white leading-none" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                2026
              </p>
              <p className="mt-6 text-white/50" style={{ fontSize: '18px' }}>
                Live stream starts {event.date}
              </p>
            </div>
          </>
        )}
      </main>

      {/* Footer bar */}
      <div
        className="page-x flex items-center justify-between border-t border-white/10 text-white/30 flex-shrink-0"
        style={{ height: '48px', fontSize: '12px' }}
      >
        <span>{event.location}</span>
        <Link href="/" className="hover:text-white transition-colors">
          betterbydesign.ie
        </Link>
      </div>

    </div>
  )
}
