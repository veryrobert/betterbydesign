import Image from 'next/image'
import Link from 'next/link'
import { keynotes, speakerProfiles, type Keynote } from '@/content/site'
import { img } from '@/lib/img'

function KeynoteCard({ slug, name, role, organisation, image }: Keynote) {
  const hasBio = !!speakerProfiles[slug]?.bio
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
        className="w-full overflow-hidden mb-5 flex-shrink-0 transition-opacity duration-200 group-hover:opacity-80"
        style={{ aspectRatio: '4 / 5', backgroundColor: '#4a4530' }}
      >
        {image ? (
          <Image
            src={img(image)}
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

      <p className="font-semibold leading-snug text-white" style={{ fontSize: '24px' }}>
        {name}
      </p>
      <p className="mt-1 text-white text-pretty" style={{ fontSize: '14px', maxWidth: '90%' }}>
        {role}{organisation ? `, ${organisation}` : ''}
      </p>
    </Wrapper>
  )
}

export default function Keynotes() {

  return (
    <section
      id="keynotes"
      className="section-y bg-bbd-black"
      aria-labelledby="keynotes-heading"
    >
      <div className="page-grid items-start">
        {/* Left: heading — sticks alongside the cards on desktop */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 lg:sticky" style={{ top: '76px' }}>
          <h2
            id="keynotes-heading"
            className="font-semibold text-white leading-none"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.875rem)' }}
          >
            Keynotes
          </h2>
        </div>

        {/* Right: sticky cards — each offset by the height of the card above */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-8 lg:mt-0">
          <ul
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-5 list-none m-0 p-0 items-start"
            role="list"
          >
            {keynotes.map((keynote) => (
              <li key={keynote.id}>
                <KeynoteCard {...keynote} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
