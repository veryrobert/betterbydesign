import { Suspense } from 'react'
import AgendaDrawer from './AgendaDrawer'
import SpeakerDrawer from './SpeakerDrawer'

export default function Drawers() {
  return (
    <>
      <Suspense>
        <AgendaDrawer />
      </Suspense>
      <Suspense>
        <SpeakerDrawer />
      </Suspense>
    </>
  )
}
