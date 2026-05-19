/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimedSkeletonOverlay } from '@/components/loading'
import { ScrollProgress } from '@/components/scroll-progress'
import { ThemeProvider } from '@/components/theme-provider'
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
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
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
      <ThemeProvider>
        <body className={inter.className}>
          <NextIntlClientProvider>
            {/* <LightningLoader images={imagesToPreload} minDuration={1200} /> */}
            {/* <CurtainLoader minDuration={900} /> */}
            <TimedSkeletonOverlay
              images={imagesToPreload}
              minDuration={900}
              maxDuration={2500}
            />
            <ScrollProgress />
            {children}
          </NextIntlClientProvider>
        </body>
      </ThemeProvider>
    </html>
  )
}
