import Hero from '@/components/Hero'
import Partners from '@/components/Partners'
import MediaSection from '@/components/MediaSection'
import Ministers from '@/components/Ministers'
import Keynotes from '@/components/Keynotes'
import Themes from '@/components/Themes'
import Panellists from '@/components/Panellists'
import DecorativeGraphic from '@/components/DecorativeGraphic'

export default function Home() {
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
