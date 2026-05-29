import Image from 'next/image'
import { panellists, panellistsIntro, event, type Panellist } from '@/content/site'

function PanellistCard({ name, role, organisation, image }: Panellist) {
  return (
    <article className="flex flex-col">
      {/* Portrait image — 550×800 ratio */}
      <div
        className="overflow-hidden mb-4 flex-shrink-0"
        style={{ width: '70%', aspectRatio: '550 / 800', backgroundColor: '#EEECEA' }}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            width={550}
            height={800}
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(100%) sepia(50%) hue-rotate(5deg) saturate(60%) brightness(90%)' }}
          />
        ) : (
          <div className="w-full h-full" aria-hidden="true" />
        )}
      </div>

      <p className="font-semibold leading-snug text-bbd-black" style={{ fontSize: '18px' }}>
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

export default function Panellists() {
  return (
    <section
      id="panellists"
      className="section-y pb-32 border-t border-bbd-black/10"
      aria-labelledby="panellists-heading"
    >
      <div className="page-grid items-start">
        {/* Left: intro — sticks while grid scrolls */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3" style={{ position: 'sticky', top: '76px', alignSelf: 'start' }}>
          <h2
            id="panellists-heading"
            className="font-semibold text-bbd-black leading-none"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.875rem)' }}
          >
            Panellists
          </h2>
          <p
            className="mt-4 text-bbd-black leading-relaxed"
            style={{ fontSize: '18px', maxWidth: '40ch' }}
          >
            {panellistsIntro}
          </p>
          <a
            href={event.agendaUrl}
            className="group inline-flex items-center gap-2 mt-6 underline decoration-1 underline-offset-[0.15em] hover:decoration-2 transition-all duration-200 ease-out text-bbd-black"
            style={{ fontSize: '18px' }}
            {...(event.agendaUrl !== '#' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            Download Agenda
          </a>
        </div>

        {/* Right: grid */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-10 lg:mt-0">
          <ul
            className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-12 list-none m-0 p-0"
            role="list"
          >
            {panellists.map((person) => (
              <li key={person.id}>
                <PanellistCard {...person} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
