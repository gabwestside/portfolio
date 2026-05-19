 
import { TimedSkeletonOverlay } from '@/components/loading'
import { ScrollProgress } from '@/components/scroll-progress'
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const messages = await getMessages()
  
  const imagesToPreload = ['/profile-photo.png']

  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
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
        </ThemeProvider>
      </body>
    </html>
  )
}
