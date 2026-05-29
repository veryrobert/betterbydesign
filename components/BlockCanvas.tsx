'use client'

import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

// Weighted: green 40%, white 30%, gold 20%, black 10%
const COLORS = [
  '#00A432', '#00A432', '#00A432', '#00A432',
  '#ffffff', '#ffffff', '#ffffff', '#ffffff',
  '#8D844E', '#8D844E',
  '#1E1E1E',
]
type Dir = 'top' | 'bottom' | 'left' | 'right'

interface Block {
  c: number; r: number
  cw: number; rh: number
  color: string
  from: Dir
  delay: number
  duration: number
}

const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4)

interface Props {
  rows?: number
  density?: number
  className?: string
  style?: CSSProperties
}

export default function BlockCanvas({ rows = 4, density = 0.58, className, style }: Props) {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap   = wrapRef.current!
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!

    let raf = 0
    let start = 0
    let blocks: Block[] = []
    let w = 0, h = 0, cw = 0
    let hasTriggered = false

    // ── Build a fresh random layout ──────────────────────────────────────────
    const generate = () => {
      const dpr  = Math.min(window.devicePixelRatio || 1, 2)
      const rect = wrap.getBoundingClientRect()
      w = rect.width
      h = rect.height
      if (w === 0 || h === 0) return

      canvas.width  = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width  = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cw = h / rows
      const cols = Math.ceil(w / cw)

      const occ = new Array(cols * rows).fill(false)
      const idx = (c: number, r: number) => r * cols + c

      // shuffled list of candidate cells
      const cells: [number, number][] = []
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          cells.push([c, r])
      for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]]
      }

      const canFit = (c: number, r: number, bw: number, bh: number) => {
        if (c + bw > cols || r + bh > rows) return false
        for (let rr = 0; rr < bh; rr++)
          for (let cc = 0; cc < bw; cc++)
            if (occ[idx(c + cc, r + rr)]) return false
        return true
      }

      const target = Math.floor(cols * rows * density)
      const newBlocks: Block[] = []
      let filled = 0
      const dirs: Dir[] = ['top', 'bottom', 'left', 'right']

      for (const [c, r] of cells) {
        if (filled >= target) break
        if (occ[idx(c, r)]) continue

        const roll = Math.random()
        let bw = 1, bh = 1
        const mobile = w < 640
        if (mobile) {
          // tall over wide on mobile
          if      (roll < 0.25 && canFit(c, r, 1, 2)) { bw = 1; bh = 2 }
          else if (roll < 0.40 && canFit(c, r, 2, 2)) { bw = 2; bh = 2 }
          else if (roll < 0.52 && canFit(c, r, 2, 1)) { bw = 2; bh = 1 }
          else if (roll < 0.60 && canFit(c, r, 3, 1)) { bw = 3; bh = 1 }
        } else {
          // wide over tall on desktop
          if      (roll < 0.15 && canFit(c, r, 4, 1)) { bw = 4; bh = 1 }
          else if (roll < 0.37 && canFit(c, r, 3, 1)) { bw = 3; bh = 1 }
          else if (roll < 0.60 && canFit(c, r, 2, 1)) { bw = 2; bh = 1 }
          else if (roll < 0.68 && canFit(c, r, 1, 2)) { bw = 1; bh = 2 }
          else if (roll < 0.75 && canFit(c, r, 2, 2)) { bw = 2; bh = 2 }
        }

        for (let rr = 0; rr < bh; rr++)
          for (let cc = 0; cc < bw; cc++)
            occ[idx(c + cc, r + rr)] = true
        filled += bw * bh

        newBlocks.push({
          c, r, cw: bw, rh: bh,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          from: dirs[Math.floor(Math.random() * 4)],
          delay:    Math.random() * 1200,
          duration: 500 + Math.random() * 300,
        })
      }

      blocks = newBlocks
    }

    // ── Draw one frame ───────────────────────────────────────────────────────
    const drawFrame = (now: number) => {
      const t = now - start
      ctx.clearRect(0, 0, w, h)
      let active = false

      for (const b of blocks) {
        const localT = (t - b.delay) / b.duration
        if (localT <= 0) { active = true; continue }
        const p = localT >= 1 ? 1 : (active = true, easeOutQuart(localT))

        const x = b.c * cw,  y = b.r * cw
        const bw = b.cw * cw, bh = b.rh * cw
        const off = 1 - p
        let dx = 0, dy = 0
        if      (b.from === 'top')    dy = -bh * off
        else if (b.from === 'bottom') dy =  bh * off
        else if (b.from === 'left')   dx = -bw * off
        else                          dx =  bw * off

        ctx.save()
        ctx.beginPath()
        ctx.rect(x, y, bw, bh)
        ctx.clip()
        ctx.fillStyle = b.color
        ctx.fillRect(x + dx, y + dy, bw, bh)
        ctx.restore()
      }

      const maxEnd = blocks.reduce((m, b) => Math.max(m, b.delay + b.duration), 0)
      if (active || t < maxEnd) raf = requestAnimationFrame(drawFrame)
    }

    // ── Kick off ─────────────────────────────────────────────────────────────
    const play = () => {
      generate()
      start = performance.now()
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(drawFrame)
    }

    generate() // size + generate without playing

    // Trigger once on scroll into view
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasTriggered) {
        hasTriggered = true
        start = performance.now()
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(drawFrame)
        io.disconnect()
      }
    }, { threshold: 0.05 })
    io.observe(wrap)

    // Hover disabled — animation plays once only

    // Resize: regenerate (replay if already triggered)
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf)
      if (hasTriggered) play()
      else generate()
    })
    ro.observe(wrap)

    return () => {
      io.disconnect()
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [rows, density])

  return (
    <div
      ref={wrapRef}
      className={`relative w-full h-full overflow-hidden bg-white${className ? ` ${className}` : ''}`}
      style={style}
    >
      <canvas ref={canvasRef} className="block" aria-hidden="true" />
    </div>
  )
}
