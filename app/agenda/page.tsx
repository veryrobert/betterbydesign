import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Partners from '@/components/Partners'
import MediaSection from '@/components/MediaSection'
import Ministers from '@/components/Ministers'
import Keynotes from '@/components/Keynotes'
import Themes from '@/components/Themes'
import Panellists from '@/components/Panellists'
import DecorativeGraphic from '@/components/DecorativeGraphic'
import Footer from '@/components/Footer'
import Drawers from '@/components/Drawers'

export const metadata = {
  title: 'Programme — Better By Design 2026',
  description: 'Full programme for the Better By Design 2026 Public Service Design Conference & Showcase.',
}

export default function AgendaPage() {
  return (
    <>
      <Header />
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
      <Footer />
      <Drawers />
    </>
  )
}
