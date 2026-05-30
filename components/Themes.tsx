import { themes, actionPlanUrl, themesActionDescription, type Theme } from '@/content/site'

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

function ThemeItem({ number, title, subtitle }: Theme) {
  return (
    <article className="flex gap-6">
      {/* Hanging number */}
      <span
        className="flex-shrink-0 font-semibold leading-none text-bbd-black select-none sm:-ml-6"
        aria-hidden="true"
        style={{ fontSize: 'clamp(2rem, 3.5vw, 2.875rem)' }}
      >
        {number}
      </span>

      <div>
        <h3
          className="font-semibold text-bbd-black leading-none"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 2.875rem)' }}
        >
          {title}
        </h3>
        <p
          className="font-normal text-bbd-black leading-none mt-2"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 2.875rem)' }}
        >
          {subtitle}
        </p>
      </div>
    </article>
  )
}

export default function Themes() {
  return (
    <section
      id="themes"
      className="section-y bg-bbd-green"
      aria-labelledby="themes-heading"
    >
      <div className="page-grid items-stretch">
        {/* Left: title sticks, action plan link pinned to bottom */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col">
          <div className="flex-1">
            <div className="lg:sticky" style={{ top: '76px' }}>
              <h2
                id="themes-heading"
                className="font-semibold text-bbd-black leading-none"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 2.875rem)' }}
              >
                Themes
              </h2>
            </div>
          </div>

          <div>
            <a
              href={actionPlanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 underline decoration-1 underline-offset-[0.15em] hover:decoration-2 transition-all duration-200 ease-out text-bbd-black"
              style={{ fontSize: '18px' }}
            >
              Designing Better Public Services Action Plan
              <ExternalArrow />
            </a>
          </div>
        </div>

        {/* Right: theme list + description at bottom */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-8 lg:mt-0 flex flex-col">
          <ul className="flex flex-col gap-12 list-none m-0 p-0" role="list">
            {themes.map((theme) => (
              <li key={theme.number}>
                <ThemeItem {...theme} />
              </li>
            ))}
          </ul>

          <p
            className="mt-auto pt-32 lg:pt-64 text-bbd-black leading-relaxed"
            style={{ fontSize: '18px', maxWidth: '60ch' }}
          >
            {themesActionDescription}
          </p>
        </div>
      </div>
    </section>
  )
}
