'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ministers, speakerProfiles, type Minister } from '@/content/site'

function MinisterCard({ slug, name, role, organisation, image }: Minister) {
  const hasBio = !!speakerProfiles[slug]
  const Wrapper = hasBio
    ? ({ children }: { children: React.ReactNode }) => (
        <Link href={`/?panel=speaker&id=${slug}`} scroll={false} className="group flex flex-col">
          {children}
        </Link>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <article className="flex flex-col">{children}</article>
      )

  return (
    <Wrapper>
      <div
        className="relative w-full overflow-hidden mb-5 flex-shrink-0 transition-opacity duration-200 group-hover:opacity-80"
        style={{ aspectRatio: '4 / 5', backgroundColor: '#b8922e' }}
      >
        {image ? (
          <>
            <Image
              src={image}
              alt={name}
              width={400}
              height={500}
              sizes="(max-width: 640px) 100vw, 33vw"
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(100%) brightness(0.85)', objectPosition: 'center 15%' }}
            />
            {/* Gold tint overlay using multiply blend */}
            <div
              className="absolute inset-0 bg-[#c49a28] mix-blend-multiply opacity-55"
              aria-hidden="true"
            />
          </>
        ) : (
          <div className="w-full h-full" aria-hidden="true" />
        )}
      </div>

      <p className="font-semibold leading-snug text-bbd-black" style={{ fontSize: '24px' }}>
        {name}
      </p>
      <p className="mt-1 text-bbd-black text-pretty" style={{ fontSize: '14px', maxWidth: '90%' }}>
        {role}{organisation ? `, ${organisation}` : ''}
      </p>
    </Wrapper>
  )
}

export default function Ministers() {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const applyOffsets = () => {
      const items = Array.from(list.querySelectorAll<HTMLLIElement>('li'))
      if (!items.length) return

      // Reset before measuring
      items.forEach((item) => { item.style.height = ''; item.style.marginTop = '' })

      if (window.innerWidth < 640) return

      // Equalise all cards to the tallest
      const maxH = Math.max(...items.map((item) => item.getBoundingClientRect().height))
      items.forEach((item) => { item.style.height = `${maxH}px` })

      // Offset each card by the preceding image-container heights only
      let cumulative = 0
      items.forEach((item, i) => {
        item.style.marginTop = i === 0 ? '' : `${cumulative}px`
        const imgBox = item.querySelector<HTMLElement>('div')
        cumulative += imgBox ? imgBox.getBoundingClientRect().height : maxH
      })
    }

    applyOffsets()
    window.addEventListener('resize', applyOffsets)
    return () => window.removeEventListener('resize', applyOffsets)
  }, [])

  return (
    <section
      id="ministers"
      className="section-y bg-bbd-olive"
      aria-labelledby="ministers-heading"
    >
      <div className="page-grid items-start">
        {/* Left: heading — sticks alongside the cards */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 lg:sticky" style={{ top: '76px' }}>
          <h2
            id="ministers-heading"
            className="font-semibold text-bbd-black leading-none"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.875rem)' }}
          >
            Ministers
          </h2>
        </div>

        {/* Right: sticky cards */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-8 lg:mt-0">
          <ul
            ref={listRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-5 list-none m-0 p-0 items-start"
            role="list"
          >
            {ministers.map((minister) => (
              <li
                key={minister.id}
                className="lg:sticky"
                style={{ top: '76px' }}
              >
                <MinisterCard {...minister} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
