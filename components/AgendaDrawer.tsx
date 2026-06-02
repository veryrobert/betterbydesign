'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { agenda, speakerProfiles, type AgendaItem } from '@/content/site'
import { lockScroll, unlockScroll } from '@/lib/scroll-lock'

// ─── Type label map ────────────────────────────────────────────────────────────
const TYPE_LABELS: Record<AgendaItem['type'], string> = {
  registration: 'Registration',
  break:        'Break',
  lunch:        'Lunch',
  welcome:      'Welcome',
  address:      'Opening Address',
  ministerial:  'Ministerial Welcome',
  keynote:      'Keynote',
  panel:        'Panel',
  closing:      'Closing Remarks',
}

// No label for generic break/admin items
const SIMPLE_TYPES    = new Set<AgendaItem['type']>(['registration', 'break', 'lunch'])
// Label-only types: green label shown, no repeated title, speakers listed directly
const LABEL_ONLY_TYPES = new Set<AgendaItem['type']>(['keynote', 'welcome', 'address', 'ministerial', 'closing'])

// ─── Speaker name button ───────────────────────────────────────────────────────
function SpeakerLink({ slug }: { slug: string }) {
  const profile = speakerProfiles[slug]
  if (!profile) return null
  const hasBio = !!profile.bio

  const inner = (
    <>
      <span className={`block font-semibold text-white text-[14px] md:text-[16px] leading-snug${hasBio ? ' group-hover:text-[#00A432] transition-colors duration-150' : ''}`}>
        {profile.name}
      </span>
      <span className={`block text-[11px] md:text-[12px] leading-snug mt-0.5 transition-colors duration-150 ${hasBio ? 'text-white/60 group-hover:text-white/80' : 'text-white/60'}`}>
        {profile.role}{profile.organisation ? `, ${profile.organisation}` : ''}
      </span>
    </>
  )

  if (!hasBio) return <div>{inner}</div>

  return (
    <Link href={`?panel=agenda&speaker=${slug}`} scroll={false} className="group block">
      {inner}
    </Link>
  )
}

// ─── Single agenda row ─────────────────────────────────────────────────────────
function AgendaRow({ item }: { item: AgendaItem }) {
  const isSimple  = SIMPLE_TYPES.has(item.type)
  const isPanel   = item.type === 'panel'
  const isKeynote = item.type === 'keynote'
  const isLabelOnly = LABEL_ONLY_TYPES.has(item.type)

  return (
    <div className="flex gap-5 md:gap-8 py-6 border-b border-white/10 last:border-0">
      {/* Time */}
      <div
        className="flex-shrink-0 text-[#00A432] tabular-nums text-[10px] font-semibold pt-[3px] w-[42px]"
      >
        {item.time}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Green label — not shown for plain break/admin items */}
        {!isSimple && (
          <div
            className="text-[#00A432] uppercase tracking-widest mb-1.5"
            style={{ fontSize: '10px', fontWeight: 600 }}
          >
            {TYPE_LABELS[item.type]}
          </div>
        )}

        {/* Label-only types (keynote / welcome / address / ministerial / closing):
            skip the title — go straight to speakers */}
        {!isLabelOnly && (
          <>
            {/* Title */}
            <div
              className="font-semibold text-white leading-snug"
              style={{ fontSize: isPanel ? '18px' : '15px' }}
            >
              {item.title}
            </div>

            {/* Subtitle — same size, lighter weight */}
            {item.subtitle && (
              <div
                className={`mt-0.5 ${isSimple ? 'text-white/60' : 'text-white'}`}
                style={{ fontSize: isPanel ? '18px' : '13px', fontWeight: 400 }}
              >
                {item.subtitle}
              </div>
            )}
          </>
        )}

        {/* Moderator */}
        {item.moderator && speakerProfiles[item.moderator] && (
          <div className="mt-3 text-white/60" style={{ fontSize: '12px' }}>
            Moderator:{' '}
            {speakerProfiles[item.moderator]?.bio ? (
              <Link
                href={`?panel=speaker&id=${item.moderator}`}
                scroll={false}
                className="text-white/80 hover:text-white transition-colors"
              >
                {speakerProfiles[item.moderator]?.name}
              </Link>
            ) : (
              <span className="text-white/60">{speakerProfiles[item.moderator]?.name}</span>
            )}
            {speakerProfiles[item.moderator]?.role
              ? `, ${speakerProfiles[item.moderator]?.role}`
              : ''}
          </div>
        )}

        {/* Speakers */}
        {item.speakers && item.speakers.length > 0 && (
          <div
            className={`${isLabelOnly ? '' : 'mt-4'} ${isPanel ? 'grid grid-cols-2 gap-x-6 gap-y-4' : 'flex flex-col gap-2'}`}
          >
            {item.speakers.map((slug) => (
              <SpeakerLink key={slug} slug={slug} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Drawer ────────────────────────────────────────────────────────────────────
export default function AgendaDrawer() {
  const searchParams = useSearchParams()
  const pathname    = usePathname()
  const router      = useRouter()
  const panelRef    = useRef<HTMLDivElement>(null)

  const panel    = searchParams.get('panel')
  const isActive = panel === 'agenda' || pathname === '/agenda'

  const [mounted, setMounted] = useState(false)
  const [open,    setOpen]    = useState(false)

  const handleClose = useCallback(() => {
    router.push('/', { scroll: false })
  }, [router])

  useEffect(() => {
    if (isActive) {
      setMounted(true)
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)))
      lockScroll()
      return () => cancelAnimationFrame(id)
    } else {
      setOpen(false)
      unlockScroll()
      const t = setTimeout(() => setMounted(false), 350)
      return () => clearTimeout(t)
    }
  }, [isActive])

  useEffect(() => () => { if (isActive) unlockScroll() }, [isActive])

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

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={handleClose}
        className={`fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Conference Programme"
        className={`fixed inset-y-0 right-0 z-[110] flex flex-col w-full md:max-w-xl bg-[#1E1E1E] outline-none transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 md:px-8 border-b border-white/10 flex-shrink-0"
          style={{ height: '56px' }}
        >
          <span className="font-semibold text-white" style={{ fontSize: '15px' }}>
            Programme
          </span>
          <button
            onClick={handleClose}
            aria-label="Close programme"
            className="text-white/40 hover:text-white transition-colors p-1 -mr-1"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8">
          {agenda.map((item, i) => (
            <AgendaRow key={i} item={item} />
          ))}
          <div style={{ height: '48px' }} />
        </div>
      </div>
    </>
  )
}
