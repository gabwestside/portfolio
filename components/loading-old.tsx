'use client'
import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

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
        })
    )

    const minTime = new Promise<void>((r) => setTimeout(() => r(), minDuration))
    const t = setTimeout(() => setHit(true), 600)

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
          'radial-gradient(800px 400px at 50% 10%, rgba(156,39,255,0.25) 0%, transparent 60%),radial-gradient(700px 380px at 50% 90%, rgba(116,23,234,0.25) 0%, transparent 60%)',
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={hit ? { opacity: [0, 0.9, 0] } : { opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className='pointer-events-none absolute inset-0 bg-white/70'
          style={{ mixBlendMode: 'screen' }}
        />
      </div>
    </motion.div>
  )
}

function Bolt({ hit }: { hit: boolean }) {
  return (
    <motion.svg
      width='280'
      height='320'
      viewBox='0 0 140 160'
      className='absolute -top-10'
      initial={{ y: -160, opacity: 0.95 }}
      animate={hit ? { y: 10 } : { y: [-160, 10] }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        filter: 'drop-shadow(0 0 22px rgba(255,255,255,.95)) blur(0.4px)',
      }}
    >
      <defs>
        <linearGradient id='bolt' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#fff' />
          <stop offset='100%' stopColor='#e9e2ff' />
        </linearGradient>
        <filter id='glow'>
          <feGaussianBlur stdDeviation='2' result='coloredBlur' />
          <feMerge>
            <feMergeNode in='coloredBlur' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>
      
      <motion.ellipse
        cx='70'
        cy='80'
        rx='62'
        ry='62'
        fill='rgba(255,255,255,.06)'
        animate={hit ? { scale: [1, 1.2, 1] } : {}}
        transform='translate(0,0)'
      />
      
      <motion.path
        d='M84 8 L42 88 H76 L50 152 L102 68 H68 Z'
        fill='url(#bolt)'
        filter='url(#glow)'
      />
    </motion.svg>
  )
}
