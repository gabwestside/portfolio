'use client'

import { motion, useScroll } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      className='fixed top-0 left-0 right-0 z-50 h-[3px] bg-gradient-to-r from-brand-500 to-fuchsia-500 origin-[0%]'
      style={{ scaleX: scrollYProgress }}
    />
  )
}
