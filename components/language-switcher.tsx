'use client'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const other = locale === 'pt' ? 'en' : 'pt'

  // troca o prefixo /pt ou /en na URL atual
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length > 0 && (parts[0] === 'pt' || parts[0] === 'en')) {
    parts[0] = other
  }

  const href = '/' + parts.join('/')
  return (
    <Link href={href} className='text-xs text-white/70 hover:text-white'>
      {other.toUpperCase()}
    </Link>
  )
}
