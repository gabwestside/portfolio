'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePathname, useRouter } from '@/i18n/navigation'
import { Languages } from 'lucide-react'
import { useTranslations } from 'next-intl'

export const LanguageSwitcher = () => {
  const t = useTranslations('LangToggle')

  const pathname = usePathname()
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='bg-transparent'>
          <Languages className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>Toggle Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='bg-indigo-950 text-white'>
        <DropdownMenuItem
          onClick={() => router.push(pathname, { locale: 'en' })}
        >
          {t('en')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(pathname, { locale: 'pt' })}
        >
          {t('pt')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
