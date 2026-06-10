'use client'

import { ElementType, ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}

export default function FadeIn({ children, className, delay = 0, as: Tag = 'div' }: Props) {
  const { ref, visible, mounted } = useInView()

  const style = mounted && !visible
    ? {
        opacity: 0,
        transform: 'translateY(18px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }
    : visible
    ? {
        opacity: 1,
        transform: 'none',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }
    : undefined

  return (
    <Tag ref={ref as any} className={className} style={style}>
      {children}
    </Tag>
  )
}
