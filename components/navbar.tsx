'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'

export function Navbar() {
  const t = useTranslations('UserProfile')
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#projetos', label: t('projects') },
    { href: '#sobre', label: t('about') },
    { href: '#contato', label: t('contact') },
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
              className='text-white/80 hover:text-white'
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
                className='bg-white/10 border-white/10'
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side='right'
              className='bg-neutral-950 border-white/10'
            >
              <div className='mt-10 flex flex-col gap-4'>
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className='text-lg'
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
