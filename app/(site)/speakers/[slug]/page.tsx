import { keynotes, panellists } from '@/content/site'
import Hero from '@/components/Hero'
import Partners from '@/components/Partners'
import MediaSection from '@/components/MediaSection'
import Ministers from '@/components/Ministers'
import Keynotes from '@/components/Keynotes'
import Themes from '@/components/Themes'
import Panellists from '@/components/Panellists'
import DecorativeGraphic from '@/components/DecorativeGraphic'

export function generateStaticParams() {
  const slugs = new Set([
    ...keynotes.map((k) => k.slug),
    ...panellists.map((p) => p.slug),
  ])
  return Array.from(slugs).map((slug) => ({ slug }))
}

export default function SpeakerPage() {
  return (
    <main id="main-content">
      <Hero />
      <Partners />
      <MediaSection />
      <Ministers />
      <Keynotes />
      <Themes />
      <Panellists />
      <DecorativeGraphic />
    </main>
  )
}
