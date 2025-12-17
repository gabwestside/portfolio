'use client'

import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export function Hero() {
  const t = useTranslations('Hero')
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 400], [0, 80])
  const y2 = useTransform(scrollY, [0, 400], [0, -60])
  const scale = useTransform(scrollY, [0, 400], [1, 0.94])

  return (
    <section className='relative overflow-hidden pt-20 pb-24'>
      <motion.div
        style={{ y: y2 }}
        aria-hidden
        className='pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-72 rounded-full blur-3xl'
      >
        <div className='w-full h-full bg-gradient-to-b from-brand-500/50 to-fuchsia-500/30 rounded-full' />
      </motion.div>

      <div className='mx-auto max-w-6xl px-4 grid lg:grid-cols-[1.1fr,0.9fr] gap-8 items-center'>
        <motion.div style={{ y: y1, scale }} className='space-y-6'>
          <h1 className='text-4xl md:text-5xl font-bold leading-tight'>
            {t('name')}
            <span className='block text-lg md:text-xl font-normal text-white/70'>
              {t('role')}
            </span>
          </h1>
          <p className='text-white/80 max-w-2xl'>{t('description')}</p>
          <div className='flex flex-wrap gap-3'>
            <Button asChild className='bg-brand-500 hover:bg-brand-600 '>
              <a href='#projects'>
                {t('viewProjects')}
              </a>
            </Button>
            <Button
              asChild
              variant='secondary'
              className='bg-white/10 border-white/10 text-zinc-200 hover:text-zinc-800'
            >
              <a
                href='https://github.com/gabwestside'
                target='_blank'
                rel='noreferrer'
              >
                <Github className='mr-2 h-4 w-4' />
                {t('github')}
              </a>
            </Button>
            <Button
              asChild
              variant='secondary'
              className='bg-white/10 border-white/10 text-zinc-200 hover:text-zinc-800'
            >
              <a
                href='https://www.linkedin.com/in/gabriel-moura-706541200/'
                target='_blank'
                rel='noreferrer'
              >
                <Linkedin className='mr-2 h-4 w-4' />
                {t('linkedin')}
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div style={{ y: y2, scale }} className='justify-self-center'>
          <div className='relative h-64 w-64 md:h-72 md:w-72'>
            <Image
              src='/profile-pic.png'
              alt={t('profileAlt')}
              fill
              className='rounded-full object-cover ring-4 ring-white/80 shadow-soft'
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
