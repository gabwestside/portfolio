'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

type Locale = 'pt' | 'en'

const LABEL: Record<Locale, string> = {
  en: 'English',
  pt: 'Português',
}
const FLAG: Record<Locale, string> = {
  en: '🇺🇸',
  pt: '🇧🇷',
}
const TITLE: Record<Locale, string> = {
  en: 'Language',
  pt: 'Idioma',
}

function buildHref(pathname: string, target: Locale) {
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length > 0 && (parts[0] === 'pt' || parts[0] === 'en')) {
    parts[0] = target
  } else {
    parts.unshift(target)
  }
  return '/' + parts.join('/')
}

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const pathname = usePathname()

  // const currentFlag = FLAG[locale]
  const currentLabel = LABEL[locale]

  const other: Locale = locale === 'pt' ? 'en' : 'pt'
  const otherHref = buildHref(pathname, other)

  const title = TITLE[locale]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='secondary'
          className='h-8 px-2 gap-2 bg-white/10 border-white/10 text-white hover:bg-white/15'
        >
          {/* <span className='text-base leading-none'>{currentFlag}</span> */}
          <span className='text-xs font-medium'>{currentLabel}</span>
          <ChevronDown className='h-4 w-4 opacity-70' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='w-40 bg-neutral-900 text-white border-white/10'
      >
        <DropdownMenuLabel className='text-xs text-white/60'>
          {title}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className='bg-white/10' />

        {/* Idioma atual (desabilitado) */}
        <DropdownMenuItem
          disabled
          className='flex items-center gap-2 focus:bg-white/10'
        >
          {/* <span className='text-base'>{currentFlag}</span> */}
          <span className='text-sm'>{currentLabel} · Atual</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className='flex items-center gap-2 focus:bg-white/10'
        >
          <Link href={otherHref}>
            <span className='mr-2 text-base'>{FLAG[other]}</span>
            <span className='text-sm'>{LABEL[other]}</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
