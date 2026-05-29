// Media section — replace the placeholder with an <img> or <video> element
// when the asset is ready. Maintains 16:6 aspect ratio.

export default function MediaSection() {
  return (
    <section aria-label="Conference media" className="border-t border-bbd-black/10">
      <div
        className="w-full bg-bbd-black/5 relative overflow-hidden"
        style={{ aspectRatio: '16 / 6' }}
        role="img"
        aria-label="Conference media — placeholder"
      >
        {/* Replace with:
            <img src="/images/conference-photo.jpg" alt="..." className="w-full h-full object-cover" />
            or
            <video src="/video/highlight.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
        */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="text-bbd-black/20 font-medium tracking-widest uppercase"
            style={{ fontSize: '12px', letterSpacing: '0.2em' }}
          >
            Media
          </div>
        </div>
      </div>
    </section>
  )
}
