'use client'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useId, useMemo, useState } from 'react'

export type LightningLoaderProps = {
  images?: string[]
  minDuration?: number
  onDone?: () => void
}

export function LightningLoader({
  images = [],
  minDuration = 1200,
  onDone,
}: LightningLoaderProps) {
  const [mounted, setMounted] = useState(true)
  const [hit, setHit] = useState(false)
  const fade = useAnimation()

  useEffect(() => {
    const preload = images.map(
      (src) =>
        new Promise<void>((resolve) => {
          if (typeof window === 'undefined') return resolve()
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => resolve()
          img.src = src
        }),
    )

    const minTime = new Promise<void>((r) => setTimeout(() => r(), minDuration))
    const t = setTimeout(() => setHit(true), 450)

    Promise.all([Promise.all(preload), minTime]).then(async () => {
      await fade.start({ opacity: 0, transition: { duration: 0.5 } })
      setMounted(false)
      onDone?.()
    })

    return () => clearTimeout(t)
  }, [images, minDuration, fade, onDone])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={fade}
      role='status'
      aria-label='Carregando'
      className='fixed inset-0 z-[9999] grid place-items-center bg-neutral-950'
      style={{
        backgroundImage:
          `radial-gradient(800px 400px at 50% 10%, var(--aurora-1) 0%, transparent 60%),` +
          `radial-gradient(700px 380px at 50% 90%, var(--aurora-2) 0%, transparent 60%)`,
        backdropFilter: 'blur(0.5px)',
      }}
    >
      <div className='relative w-[min(90vw,680px)] h-[min(60vh,420px)] grid place-items-center'>
        <motion.h1
          className='text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text'
          style={{
            backgroundImage: 'linear-gradient(180deg,#ffffff,#c9baff)',
            textShadow: '0 0 24px rgba(255,255,255,.6)',
          }}
          animate={hit ? { scale: [1, 1.06, 0.98, 1], y: [0, 3, -2, 0] } : {}}
          transition={{
            times: [0, 0.5, 0.85, 1],
            duration: 0.35,
            ease: 'easeOut',
          }}
        >
          GABWESTSIDE
        </motion.h1>

        <Bolt hit={hit} />

        {/* flash menos agressivo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={hit ? { opacity: [0, 0.55, 0] } : { opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className='pointer-events-none absolute inset-0 bg-white'
          style={{ mixBlendMode: 'screen' }}
        />
      </div>
    </motion.div>
  )
}

function Bolt({ hit }: { hit: boolean }) {
  const uid = useId()

  // raio “jagged” determinístico por render (melhor que shape chapado)
  const points = useMemo(() => {
    const topX = 70
    const topY = 8
    const bottomY = 170

    const segs = 8
    const step = (bottomY - topY) / segs

    let x = topX
    const pts: Array<[number, number]> = [[x, topY]]

    for (let i = 1; i <= segs; i++) {
      const dir = i % 2 === 0 ? -1 : 1
      const jitter = 10 + Math.random() * 10
      x = Math.max(28, Math.min(112, x + dir * jitter))
      pts.push([x, topY + step * i])
    }

    return pts.map(([px, py]) => `${px},${py}`).join(' ')
  }, [])

  return (
    <motion.svg
      width='320'
      height='380'
      viewBox='0 0 140 180'
      className='absolute -top-20 pointer-events-none'
      initial={{ y: -220, opacity: 0.9 }}
      animate={hit ? { y: 0, opacity: 1 } : { y: -220, opacity: 0.9 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{ filter: 'drop-shadow(0 0 26px rgba(255,255,255,.85))' }}
    >
      <defs>
        <linearGradient id={`bolt-${uid}`} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#fff' />
          <stop offset='65%' stopColor='#f1ecff' />
          <stop offset='100%' stopColor='#d9ccff' />
        </linearGradient>

        <filter id={`glow-${uid}`} x='-50%' y='-50%' width='200%' height='200%'>
          <feGaussianBlur stdDeviation='3.5' result='blur' />
          <feColorMatrix
            in='blur'
            type='matrix'
            values='
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 18 -7'
            result='glow'
          />
          <feMerge>
            <feMergeNode in='glow' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>

      <motion.ellipse
        cx='70'
        cy='120'
        rx='62'
        ry='62'
        fill='rgba(255,255,255,.06)'
        animate={
          hit ? { scale: [1, 1.25, 1], opacity: [0.05, 0.14, 0.06] } : {}
        }
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />

      <polyline
        points={points}
        fill='none'
        stroke='#ffffff'
        strokeOpacity='0.35'
        strokeWidth='10'
        strokeLinecap='round'
        strokeLinejoin='round'
        filter={`url(#glow-${uid})`}
      />

      <polyline
        points={points}
        fill='none'
        stroke={`url(#bolt-${uid})`}
        strokeWidth='4.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </motion.svg>
  )
}
