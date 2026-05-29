import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Partners from '@/components/Partners'
import MediaSection from '@/components/MediaSection'
import Keynotes from '@/components/Keynotes'
import Ministers from '@/components/Ministers'
import Themes from '@/components/Themes'
import Panellists from '@/components/Panellists'
import DecorativeGraphic from '@/components/DecorativeGraphic'
import Footer from '@/components/Footer'

export default function Home() {
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
    </>
  )
}
