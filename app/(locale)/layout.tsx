/* eslint-disable @typescript-eslint/no-explicit-any */
import { LightningLoader } from '@/components/loading'
import { ScrollProgress } from '@/components/scroll-progress'
import { getProjects } from '@/lib/projects'
import type { Metadata } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')
  return {
    title: t('title'),
    description: t('description'),
    icons: [{ rel: 'icon', url: '/favicon_gabwest.ico' }],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const messages = useMessages()
  const projectList = (messages as any).Projects?.ProjectList || []
  const projects = getProjects(projectList)

  const imagesToPreload = [
    '/profile-photo.png',
    ...projects.map((p) => p.image),
  ]

  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider>
          <LightningLoader images={imagesToPreload} minDuration={1200} />
          <ScrollProgress />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
