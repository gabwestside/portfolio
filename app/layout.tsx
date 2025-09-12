import { ScrollProgress } from '@/components/scroll-progress'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gabwestside • Portfólio',
  description: 'Projetos, experiências e contato de Gabriel (Gabwestside).',
  metadataBase: new URL('https://example.com'),
  icons: [{ rel: 'icon', url: '/favicon_gabwest.ico' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body className={inter.className}>
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
