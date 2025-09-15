import { LightningLoader } from '@/components/loading'
import { ScrollProgress } from '@/components/scroll-progress'
import { projects } from '@/lib/projects'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gabwestside • Portfólio',
  description: 'Projetos, experiências e contato de Gabriel (Gabwestside).',
  icons: [{ rel: 'icon', url: '/favicon_gabwest.ico' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const imagesToPreload = [
    '/profile-photo.png',
    ...projects.map((p) => p.image),
  ]

  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body className={inter.className}>
        <LightningLoader images={imagesToPreload} minDuration={1200} />
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
