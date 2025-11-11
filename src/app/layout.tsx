import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader';
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import Toaster from '@/components/Toaster'

const font = Montserrat({ subsets: ["latin"], weight: ["300","400","500","600","700","800"] });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta')
  return {
    title: t('title'),
    description: t('description')
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${font.className} bg-white dark:bg-black antialiased relative`}>
        <NextTopLoader color="#07be8a" />
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider
              attribute='class'
              enableSystem={true}
              defaultTheme='light'>
              <Header />
              {children}
              <Toaster />
            </ThemeProvider>
          </NextIntlClientProvider>
      </body>
    </html>
  )
}
