import Image from 'next/image'
import { partners, partnerLogos } from '@/content/site'

export default function Partners() {
  return (
    <section className="section-y border-t border-bbd-black/10" aria-labelledby="partners-heading">
      <div className="page-grid items-start">
        <div className="col-span-1 md:col-span-1 lg:col-span-3">
          <h2
            id="partners-heading"
            className="font-semibold text-bbd-black leading-none"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.875rem)' }}
          >
            {partners.heading}
          </h2>
          <p
            className="mt-4 text-bbd-black leading-relaxed"
            style={{ fontSize: '18px', maxWidth: '48ch' }}
          >
            {partners.body}
          </p>
          <div className="mt-32 flex flex-wrap items-center gap-6">
            {partnerLogos.map((logo) => (
              <Image
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={40}
                className="w-auto object-contain"
                style={{ maxHeight: '3rem', maxWidth: '200px', width: 'auto' }}
              />
            ))}
          </div>
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-4" />
      </div>
    </section>
  )
}
