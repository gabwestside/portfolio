'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Github, Linkedin, Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import { LanguageSwitcher } from './language-switcher'

export function Navbar() {
  const t = useTranslations('Navbar')
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#projects', label: t('projects') },
    { href: '#about', label: t('about') },
    { href: '#contact', label: t('contact') },
  ]

  return (
    <header className='sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20 border-b border-white/10'>
      <nav className='mx-auto max-w-6xl px-4 h-14 flex items-center justify-between'>
        <Link href='#' className='font-semibold tracking-tight'>
          {t('brand')}
        </Link>

        <div className='hidden md:flex gap-6 text-sm'>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className='text-white/80 hover:text-white transition-colors'
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className='md:hidden'>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                size='icon'
                variant='secondary'
                className='bg-white/10 border-white/10 text-zinc-200 hover:text-zinc-800'
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side='right'
              className='bg-gradient-to-b from-[#320a66] to-[#1d0730ee] border-white/10 text-white flex flex-col'
            >
              <SheetHeader className='flex flex-row items-center justify-between'>
                <SheetTitle className='font-bold text-lg tracking-wide'>
                  <div className='flex gap-2 text-zinc-300 items-center '>
                    <Menu />
                    Menu
                  </div>
                </SheetTitle>

                <SheetClose
                  onClick={() => setOpen(false)}
                  className='text-white hover:bg-white/10'
                />
              </SheetHeader>

              <div className='mt-10 flex flex-col gap-6 w-full justify-center items-center'>
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className='text-lg font-medium hover:text-white/90 hover:translate-x-1 transition-transform'
                  >
                    {l.label}
                  </a>
                ))}
              </div>

              <div className='mt-auto pb-6 flex gap-4 justify-center'>
                <a
                  href='https://github.com/gabwestside'
                  target='_blank'
                  rel='noreferrer'
                  className='hover:text-neutral-200 transition-colors'
                >
                  <Github />
                </a>
                <a
                  href='https://www.linkedin.com/in/gabriel-moura-706541200/'
                  target='_blank'
                  rel='noreferrer'
                  className='hover:text-neutral-200 transition-colors'
                >
                  <Linkedin />
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <LanguageSwitcher />
      </nav>
    </header>
  )
}
