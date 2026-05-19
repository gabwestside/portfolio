'use client'

import { Button } from '@/components/ui/button'
import { contacts } from '@/lib/projects'
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

  const github = contacts.find((l) => l.name === 'GitHub')?.href || '#'
  const linkedin = contacts.find((l) => l.name === 'LinkedIn')?.href || '#'

  return (
    <section className='relative overflow-hidden pt-20 pb-24'>
      {/* Halo orgânico usando o tema atual */}
      <motion.div
        style={{ y: y2 }}
        aria-hidden
        className='pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-72 rounded-full blur-3xl opacity-70'
      >
        <div
          className='w-full h-full rounded-full'
          style={{
            background:
              'linear-gradient(180deg, color-mix(in oklab, var(--brand-1) 55%, transparent), color-mix(in oklab, var(--brand-2) 35%, transparent))',
          }}
        />
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
            <Button
              asChild
              className='border border-white/10'
              style={{
                background:
                  'linear-gradient(90deg, var(--brand-1), var(--brand-2))',
              }}
            >
              <a href='#projects'>{t('viewProjects')}</a>
            </Button>
            
            <Button
              asChild
              variant='secondary'
              className='bg-white/10 border-white/10 text-zinc-200 hover:bg-white/15 hover:text-white'
            >
              <a href={github} target='_blank' rel='noreferrer'>
                <Github className='mr-2 h-4 w-4' />
                {t('github')}
              </a>
            </Button>

            <Button
              asChild
              variant='secondary'
              className='bg-white/10 border-white/10 text-zinc-200 hover:bg-white/15 hover:text-white'
            >
              <a href={linkedin} target='_blank' rel='noreferrer'>
                <Linkedin className='mr-2 h-4 w-4' />
                {t('linkedin')}
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div style={{ y: y2, scale }} className='justify-self-center'>
          <div className='relative h-64 w-64 md:h-72 md:w-72'>
            <div
              className='absolute inset-0 -z-10 rounded-full blur-2xl opacity-40'
              style={{
                background:
                  'radial-gradient(circle, var(--brand-2) 0%, transparent 65%)',
              }}
            />

            <Image
              src='/profile-pic.png'
              alt={t('profileAlt')}
              fill
              className='rounded-full object-cover ring-4 ring-white/80 drop-shadow-[0_18px_40px_rgba(0,0,0,.35)]'
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
