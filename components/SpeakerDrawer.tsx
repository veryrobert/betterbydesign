'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { speakerProfiles } from '@/content/site'

export default function SpeakerDrawer() {
  const searchParams = useSearchParams()
  const router       = useRouter()
  const panelRef     = useRef<HTMLDivElement>(null)

  const panel = searchParams.get('panel')

  // Two ways a speaker can be active:
  //   1. /?panel=speaker&id=slug        — standalone (opened from main page)
  //   2. /?panel=agenda&speaker=slug    — side-by-side alongside the agenda
  const standaloneId  = panel === 'speaker' ? searchParams.get('id') : null
  const sideBySideId  = panel === 'agenda'  ? searchParams.get('speaker') : null
  const speakerId     = standaloneId ?? sideBySideId
  const isSideBySide  = !!sideBySideId

  const isActive = !!speakerId

  const [mounted,     setMounted]     = useState(false)
  const [open,        setOpen]        = useState(false)
  const [currentSlug, setCurrentSlug] = useState(speakerId)

  const handleClose = useCallback(() => {
    router.push('/', { scroll: false })
  }, [router])

  const handleBack = useCallback(() => {
    if (isSideBySide) {
      router.push('/?panel=agenda', { scroll: false })
    } else {
      router.back()
    }
  }, [isSideBySide, router])

  useEffect(() => {
    if (isActive) {
      setCurrentSlug(speakerId)
      setMounted(true)
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)))
      document.body.style.overflow = 'hidden'
      return () => cancelAnimationFrame(id)
    } else {
      setOpen(false)
      document.body.style.overflow = ''
      const t = setTimeout(() => setMounted(false), 350)
      return () => clearTimeout(t)
    }
  }, [isActive, speakerId])

  useEffect(() => () => { document.body.style.overflow = '' }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, handleClose])

  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  if (!mounted) return null

  const profile = currentSlug ? speakerProfiles[currentSlug] : null
  if (!profile) return null

  const bioParagraphs = profile.bio ? profile.bio.split('\n\n') : []

  // Animation: standalone slides in from right; side-by-side slides in from left on desktop
  const closedTranslate = isSideBySide
    ? 'translate-x-full md:-translate-x-full'
    : 'translate-x-full'

  return (
    <>
      {/* Backdrop — shown standalone always; hidden on desktop in side-by-side (agenda has its own) */}
      <div
        aria-hidden="true"
        onClick={handleClose}
        className={[
          'fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm transition-opacity duration-300',
          isSideBySide ? 'md:hidden' : '',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="speaker-drawer-name"
        className={[
          'fixed inset-y-0 flex flex-col w-full bg-[#1E1E1E] outline-none transition-transform duration-300 ease-out',
          // Positioning: standalone → right-0; side-by-side → right-0 mobile, right-[36rem] desktop
          isSideBySide
            ? 'right-0 md:right-[36rem] md:max-w-xs z-[110]'
            : 'right-0 md:max-w-sm z-[130]',
          open ? 'translate-x-0' : closedTranslate,
        ].join(' ')}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 border-b border-white/10 flex-shrink-0"
          style={{ height: '56px' }}
        >
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
            aria-label="Back"
            style={{ fontSize: '13px' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="text-white/40 hover:text-white transition-colors p-1 -mr-1"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          {/* Portrait image */}
          {profile.image && (
            <div
              className="overflow-hidden mb-6 flex-shrink-0"
              style={{ width: '96px', aspectRatio: '4 / 5', backgroundColor: '#2a2820' }}
            >
              <Image
                src={profile.image}
                alt={profile.name}
                width={96}
                height={120}
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(100%) sepia(40%) brightness(85%)' }}
              />
            </div>
          )}

          {/* Name */}
          <h2
            id="speaker-drawer-name"
            className="font-semibold text-white leading-tight"
            style={{ fontSize: '20px' }}
          >
            {profile.name}
          </h2>

          {/* Role + org */}
          <p className="mt-1 text-white/50 leading-snug" style={{ fontSize: '13px' }}>
            {profile.role}
            {profile.organisation ? ` — ${profile.organisation}` : ''}
          </p>

          {/* Bio */}
          {bioParagraphs.length > 0 && (
            <div className="mt-6 flex flex-col gap-4">
              {bioParagraphs.map((para, i) => (
                <p key={i} className="text-white/70 leading-relaxed" style={{ fontSize: '14px' }}>
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
