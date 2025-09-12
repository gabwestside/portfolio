'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Github, Linkedin } from 'lucide-react'

export function Hero() {
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
        // style={{ y: y2 }}
      >
        <div className='w-full h-full bg-gradient-to-b from-brand-500/50 to-fuchsia-500/30 rounded-full' />
      </motion.div>

      <div className='mx-auto max-w-6xl px-4 grid lg:grid-cols-[1.1fr,0.9fr] gap-8 items-center'>
        <motion.div style={{ y: y1, scale }} className='space-y-6'>
          <h1 className='text-4xl md:text-5xl font-bold leading-tight'>
            Gabriel Rodrigues
            <span className='block text-lg md:text-xl font-normal text-white/70'>
              Desenvolvedor de Software
            </span>
          </h1>
          <p className='text-white/80 max-w-2xl'>
            Crio experiências web modernas, acessíveis e performáticas. Curto
            interfaces orgânicas, animações sutis e código limpo.
          </p>
          <div className='flex flex-wrap gap-3'>
            <Button asChild className='bg-brand-500 hover:bg-brand-600'>
              <a href='#projetos'>Ver projetos</a>
            </Button>
            <Button
              asChild
              variant='secondary'
              className='bg-white/10 border-white/10'
            >
              <a
                href='https://github.com/seu-usuario'
                target='_blank'
                rel='noreferrer'
              >
                <Github className='mr-2 h-4 w-4' />
                GitHub
              </a>
            </Button>
            <Button
              asChild
              variant='secondary'
              className='bg-white/10 border-white/10'
            >
              <a
                href='https://www.linkedin.com/in/seu-usuario'
                target='_blank'
                rel='noreferrer'
              >
                <Linkedin className='mr-2 h-4 w-4' />
                LinkedIn
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div style={{ y: y2, scale }} className='justify-self-center'>
          <div className='relative h-64 w-64 md:h-72 md:w-72'>
            <Image
              src='/profile-pic.jpg'
              alt='Foto de perfil'
              fill
              className='rounded-full object-cover ring-4 ring-white/80 shadow-soft'
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
