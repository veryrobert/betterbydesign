import { event } from '@/content/site'
import Link from 'next/link'

export default function LivePage() {
  return (
    <div className="h-screen bg-bbd-black flex flex-col text-white overflow-hidden">

      {/* Header */}
      <header
        className="page-x flex items-center justify-between flex-shrink-0 border-b border-white/10"
        style={{ height: '56px' }}
      >
        <div>
          <p className="font-semibold text-white leading-none" style={{ fontSize: '15px' }}>
            Better By Design 2026
          </p>
          <p className="text-white/40 leading-none mt-0.5" style={{ fontSize: '11px' }}>
            {event.date} — {event.location}
          </p>
        </div>
        <Link href="/" className="text-white/40 hover:text-white transition-colors" style={{ fontSize: '13px' }}>
          ← Back to site
        </Link>
      </header>

      {/* Video area */}
      <main id="main-content" className="flex-1 flex flex-col page-x py-5 min-h-0">
        {event.isLive ? (
          <div className="flex-1 relative">
            <iframe
              src={event.liveStreamUrl}
              title="Better By Design 2026 — Live Stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        ) : (
          <div
            className="w-full flex-shrink-0 flex items-center justify-center bg-white/10 rounded-sm"
            style={{ aspectRatio: '16 / 9' }}
          >
            <div className="text-center">
              <div
                className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-3"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/30 ml-1" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white/30" style={{ fontSize: '13px' }}>
                Live stream — {event.date}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer bar */}
      <div
        className="page-x flex items-center justify-between border-t border-white/10 text-white/30 flex-shrink-0"
        style={{ height: '48px', fontSize: '12px' }}
      >
        <span>Better By Design 2026</span>
        <Link href="/" className="hover:text-white transition-colors">
          betterbydesign.ie
        </Link>
      </div>

    </div>
  )
}
