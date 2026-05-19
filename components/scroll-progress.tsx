'use client'

import { motion, useScroll } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className='fixed top-0 left-0 right-0 z-50 h-[3px] origin-[0%]'
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, var(--brand-1), var(--brand-2))',
        boxShadow:
          '0 0 18px color-mix(in oklab, var(--brand-2) 35%, transparent)',
      }}
    />
  )
}
