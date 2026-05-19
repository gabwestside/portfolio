'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Palette } from 'lucide-react'
import { useTheme } from 'next-themes'

const THEMES = [
  { id: 'nebula', label: 'Nebula (Purple)' },
  { id: 'mint', label: 'Aurora Mint' },
  { id: 'sunset', label: 'Sunset Coral' },
  { id: 'ocean', label: 'Ocean Blue' },
  { id: 'gold', label: 'Gold Noir' },
] as const

type ThemeId = (typeof THEMES)[number]['id']

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const current = (theme as ThemeId) ?? 'nebula'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='bg-transparent'>
          <Palette className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>Toggle Theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='bg-transparent text-white'>
        {THEMES.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={t.id === current ? 'opacity-70' : undefined}
          >
            {t.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}