'use client'

import { useEffect, useRef } from 'react'

// cqw is supported in all modern browsers but we measure via ResizeObserver
// as a fallback for older environments. The CSS var overrides the cqw value
// when set; if undefined the browser's native cqw implementation wins.
const CQW_SUPPORTED =
  typeof CSS !== 'undefined' && CSS.supports('font-size', '1cqw')

export default function FluidContainer({
  children,
  className,
  style,
  multiplier = 0.12,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  multiplier?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (CQW_SUPPORTED || !ref.current) return

    const el = ref.current
    const update = () => {
      el.style.setProperty('--fluid-font-size', `${el.offsetWidth * multiplier}px`)
    }

    const ro = new ResizeObserver(update)
    ro.observe(el)
    update()

    return () => ro.disconnect()
  }, [multiplier])

  return (
    <div ref={ref} style={{ containerType: 'inline-size', ...style }} className={className}>
      {children}
    </div>
  )
}
