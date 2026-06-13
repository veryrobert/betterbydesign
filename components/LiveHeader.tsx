'use client'

import { useState } from 'react'
import Link from 'next/link'
import { navigation } from '@/content/site'
import LiveShareButton from '@/components/LiveShareButton'

const isClientNav = (href: string) => href.startsWith('/?')

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col gap-[5px] w-5" aria-hidden="true">
      <span className={`block h-[2px] w-full bg-white origin-center transition-transform duration-200 ease-out ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
      <span className={`block h-[2px] w-full bg-white transition-opacity duration-150 ease-out ${open ? 'opacity-0' : 'opacity-100'}`} />
      <span className={`block h-[2px] w-full bg-white origin-center transition-transform duration-200 ease-out ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
    </span>
  )
}

export default function LiveHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header
        className="relative z-50 page-x flex items-center justify-between flex-shrink-0 border-b border-white/10"
        style={{ height: '56px' }}
      >
        <p className="font-semibold text-white" style={{ fontSize: '15px' }}>
          Better By Design 2026
        </p>
        <div className="flex items-center gap-5">
          <LiveShareButton />
          <Link href="/" className="text-white/70 hover:text-white transition-colors" style={{ fontSize: '13px' }}>
            ← Back to site
          </Link>
          <button
            className="flex items-center justify-center p-1 -mr-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <BurgerIcon open={menuOpen} />
          </button>
        </div>
      </header>

      {/* Mobile: full-screen overlay */}
      <div
        className={[
          'sm:hidden fixed inset-0 z-40 bg-bbd-black flex flex-col page-x',
          'transition-opacity duration-200 ease-out',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        style={{ paddingTop: '56px' }}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col list-none m-0 p-0 pt-10 gap-1" role="list">
          {navigation.map((item) => (
            <li key={item.label}>
              {isClientNav(item.href) ? (
                <Link
                  href={item.href}
                  scroll={false}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white no-underline font-normal py-3"
                  style={{ fontSize: '24px' }}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white no-underline font-normal py-3"
                  style={{ fontSize: '24px' }}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop: dropdown panel */}
      <div
        className={[
          'hidden sm:block fixed z-40 bg-bbd-black border-l border-b border-white/10 right-0',
          'transition-all duration-200 ease-out',
          menuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2',
        ].join(' ')}
        style={{ top: '56px', minWidth: '220px' }}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col list-none m-0 p-0 px-8 py-6 gap-1" role="list">
          {navigation.map((item) => (
            <li key={item.label}>
              {isClientNav(item.href) ? (
                <Link
                  href={item.href}
                  scroll={false}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white no-underline font-normal py-2"
                  style={{ fontSize: '18px' }}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white no-underline font-normal py-2"
                  style={{ fontSize: '18px' }}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Backdrop for desktop dropdown */}
      {menuOpen && (
        <div
          className="hidden sm:block fixed inset-0 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
