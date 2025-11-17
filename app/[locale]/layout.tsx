import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { ScrollProgress } from '@/components/scroll-progress'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })  

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://example.com'),
    icons: [{ rel: 'icon', url: '/favicon_gabwest.ico' }],
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: 'pt' | 'en' }
}) {
  const { locale } = params

  if (!routing.locales.includes(locale)) {
    notFound()
  }

  const messages = (await import(`@/messages/${locale}.json`)).default

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ScrollProgress />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
