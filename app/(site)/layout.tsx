import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Drawers from '@/components/Drawers'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Drawers />
    </>
  )
}
