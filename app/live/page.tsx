import { event } from '@/content/site'
import Link from 'next/link'

export default function LivePage() {
  return (
    <main id="main-content" className="min-h-screen bg-bbd-black flex flex-col">

      {/* Stream */}
      <div className="flex-1 flex flex-col">
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
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
            <p
              className="font-semibold text-white leading-none"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              Better By Design
            </p>
            <p
              className="font-light text-white leading-none mt-1"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              2026
            </p>
            <p className="mt-8 text-white/50" style={{ fontSize: '18px' }}>
              Live stream starts {event.date}
            </p>
            <Link
              href="/"
              className="mt-10 text-white/40 hover:text-white transition-colors underline decoration-1 underline-offset-[0.15em]"
              style={{ fontSize: '14px' }}
            >
              Back to site
            </Link>
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div
        className="page-x flex items-center justify-between border-t border-white/10 text-white/30 flex-shrink-0"
        style={{ height: '48px', fontSize: '12px' }}
      >
        <span>{event.date} — {event.location}</span>
        <Link href="/" className="hover:text-white transition-colors">
          betterbydesign.ie
        </Link>
      </div>

    </main>
  )
}
