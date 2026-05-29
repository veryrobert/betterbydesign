import { event } from '@/content/site'
import FluidContainer from '@/components/FluidContainer'
import BlockCanvas from '@/components/BlockCanvas'

function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="inline-block flex-shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DownArrow() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="flex-shrink-0 transition-transform duration-200 ease-out group-hover:translate-y-1"
    >
      <path
        d="M10 3v14M4 11l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      className="flex flex-col"
      style={{ height: '100svh', paddingTop: '56px' }}
      aria-label="Conference introduction"
    >
      {/* Top content — single grid, columns stretch to equal height */}
      <div className="page-x pt-6" style={{ paddingBottom: '20px' }}>
        <div className="page-grid !px-0 items-stretch" style={{ fontSize: '18px' }}>

          {/* Left cols 1–3: tagline + Book Tickets */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3 flex flex-col">
            <p className="font-normal text-bbd-black leading-snug">
              {event.tagline}
              <br />
              {event.subtag}
            </p>
            <a
              href={event.ticketsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 underline decoration-1 underline-offset-[0.15em] hover:decoration-2 transition-all duration-200 ease-out w-fit mt-4 lg:mt-auto"
            >
              Book Tickets
              <ExternalArrow />
            </a>
          </div>

          {/* Right cols 4–7: headline, then Keynotes CTA */}
          <FluidContainer className="col-span-1 md:col-span-1 lg:col-span-4 lg:-mt-6 flex flex-col">
            <h1>
              <p className="fluid-display text-bbd-black leading-none">{event.name}</p>
              <p className="fluid-display-light text-bbd-black leading-none">{event.year}</p>
            </h1>
            <a
              href="#keynotes"
              className="group flex items-center justify-between w-full underline decoration-1 underline-offset-[0.15em] hover:decoration-2 transition-all duration-200 ease-out mt-6 lg:mt-48"
            >
              <span>Keynotes</span>
              <DownArrow />
            </a>
          </FluidContainer>

        </div>
      </div>

      {/* Canvas graphic — fills remaining space below the type */}
      <div className="flex-1 w-full overflow-hidden">
        <BlockCanvas style={{ width: '100%', height: '100%' }} />
      </div>
    </section>
  )
}
