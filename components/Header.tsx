'use client'

import Link from 'next/link'
import { navigation, event } from '@/content/site'

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-bbd-black"
      style={{ height: '56px' }}
      role="banner"
    >
      <div className="flex items-center justify-between h-full page-x">
        <Link
          href="/"
          className="text-white no-underline font-semibold tracking-tight"
          style={{ fontSize: '18px' }}
          aria-label={`${event.name} — return to top`}
        >
          {event.name} <span className="font-normal">{event.year}</span>
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="hidden sm:flex items-center gap-6 md:gap-8 list-none m-0 p-0">
            {navigation.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-white no-underline font-normal hover:opacity-60 transition-opacity duration-200 ease-out"
                  style={{ fontSize: '18px' }}
                  {...(item.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
