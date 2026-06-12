'use client'

import { ElementType, ReactNode, useEffect, useState } from 'react'
import { useInView } from '@/hooks/useInView'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}

export default function FadeIn({ children, className, delay = 0, as: Tag = 'div' }: Props) {
  const { ref, visible } = useInView()
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const style = reducedMotion
    ? { opacity: visible ? 1 : 0 }
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(18px)',
        transition: visible
          ? `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`
          : undefined,
      }

  return (
    <Tag ref={ref as any} className={className} style={style}>
      {children}
    </Tag>
  )
}
