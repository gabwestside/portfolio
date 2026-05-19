'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
  minDuration?: number
  onDone?: () => void
}

export function CurtainLoader({ minDuration = 800, onDone }: Props) {
  const [mounted, setMounted] = useState(true)
  const fade = useAnimation()

  useEffect(() => {
    const t = setTimeout(async () => {
      await fade.start({ opacity: 0, transition: { duration: 0.45 } })
      setMounted(false)
      onDone?.()
    }, minDuration)

    return () => clearTimeout(t)
  }, [minDuration, fade, onDone])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={fade}
      className='fixed inset-0 z-[9999] grid place-items-center bg-neutral-950'
      style={{
        backgroundImage:
          `radial-gradient(900px 450px at 50% 15%, var(--aurora-1) 0%, transparent 60%),` +
          `radial-gradient(900px 500px at 50% 95%, var(--aurora-2) 0%, transparent 60%),` +
          `linear-gradient(180deg, #07070b 0%, #090913 55%, #07070b 100%)`,
      }}
    >
      
      <div className='pointer-events-none absolute inset-0 backdrop-blur-[1.5px]' />

      <div className='relative w-[min(90vw,560px)] text-center'>
        <motion.h1
          className='text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text'
          style={{ backgroundImage: 'linear-gradient(180deg,#ffffff,#c9baff)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          GABWESTSIDE
        </motion.h1>

        <motion.p
          className='mt-3 text-sm text-white/60'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.35 }}
        >
          Carregando…
        </motion.p>
        
        <div className='mt-6 h-2 w-full rounded-full bg-white/10 overflow-hidden border border-white/10'>
          <motion.div
            className='h-full w-1/2'
            style={{
              background:
                'linear-gradient(90deg, var(--brand-1), var(--brand-2))',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        
        <motion.div
          className='pointer-events-none absolute -inset-10 rounded-[32px]'
          style={{
            background:
              'linear-gradient(90deg, color-mix(in oklab, var(--brand-2) 20%, transparent), color-mix(in oklab, var(--brand-1) 12%, transparent))',
            filter: 'blur(18px)',
          }}
          animate={{ opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
