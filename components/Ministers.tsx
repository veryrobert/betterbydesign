'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { ministers, type Minister } from '@/content/site'

function MinisterCard({ name, role, organisation, image }: Minister) {
  return (
    <article className="flex flex-col">
      <div
        className="w-full overflow-hidden mb-5 flex-shrink-0"
        style={{ aspectRatio: '4 / 5', backgroundColor: '#6b6238' }}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            width={400}
            height={500}
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(100%) sepia(50%) hue-rotate(5deg) saturate(60%) brightness(90%)' }}
          />
        ) : (
          <div className="w-full h-full" aria-hidden="true" />
        )}
      </div>

      <p className="font-semibold leading-snug text-bbd-black" style={{ fontSize: '24px' }}>
        {name}
      </p>
      <p className="mt-1 text-bbd-black text-pretty" style={{ fontSize: '14px', maxWidth: '90%' }}>
        {role}
      </p>
      <p className="text-bbd-black text-pretty" style={{ fontSize: '14px', maxWidth: '90%' }}>
        {organisation}
      </p>
    </article>
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

      if (window.innerWidth < 640) {
        items.forEach((item) => { item.style.marginTop = '' })
        return
      }

      const cardHeight = items[0].getBoundingClientRect().height
      items.forEach((item, i) => {
        item.style.marginTop = i === 0 ? '' : `${i * cardHeight}px`
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
        <div className="col-span-1 md:col-span-2 lg:col-span-3" style={{ position: 'sticky', top: '76px' }}>
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
                style={{ position: 'sticky', top: '76px' }}
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
