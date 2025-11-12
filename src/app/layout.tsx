import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader';
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server' // getLocale removed
import Toaster from '@/components/Toaster'
import Image from 'next/image' // <-- 1. IMPORT IMAGE
import { ReactNode } from 'react' // <-- 2. IMPORT REACTNODE

const font = Montserrat({ subsets: ["latin"], weight: ["300","400","500","600","700","800"] });

// 3. FIX METADATA FUNCTION (Must accept params)
export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    title: t('title'),
    description: t('description')
  }
}

// 4. FIX ROOTLAYOUT FUNCTION (Must accept params)
export default async function RootLayout({
  children,
  params: { locale } // <-- Get locale from params
}: Readonly<{
  children: ReactNode;
  params: { locale: string }; // <-- Define type for params
}>) {
  
  // const locale = await getLocale() // <-- This line is no longer needed
  const messages = await getMessages()

  // --- 5. ADD CONTACT CONSTANTS ---
  const ZALO_LINK = "https://zalo.me/0345747138";
  const PHONE_NUMBER = "0345.747.138"; // Formatted for display
  const PHONE_LINK = "tel:0345747138";
  // --- END OF CONTACT CONSTANTS ---

  return (
    <html lang={locale}> {/* Use locale from params */}
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

          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-5">
            
            {/* 1. Zalo Button  */}
            <a
              href={ZALO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              title="Contact Zalo"
              className="relative"
            >
              <Image
                src="/images/zalo-1.png" 
                width={64}
                height={64}
                alt="Zalo"
                className="w-16 h-16 relative z-10" // 64px size
              />
            </a>

            {/* 2. Phone Button  */}
            <a
              href={PHONE_LINK}
              title="Call Hotline"
              className="flex items-center group"
            >
              {/* Phone Icon (Left side) - 3 Layers */}
              <div className="relative flex-shrink-0">
                
                {/* LAYER 2 (z-10): Red Circle background */}
                <div className="absolute inset-0 bg-red-500 rounded-full z-10"></div>

                {/* LAYER 3 (z-20): Phone Icon */}
                <Image
                  src="/images/icon-1.png" 
                  width={64}
                  height={64}
                  alt="Phone"
                  className="w-16 h-16 relative z-20" // 64px size
                />
              </div>

              {/* Text (red background, white text)  */}
              <div 
                className="
                  bg-red-500 text-white text-lg font-bold px-5 py-3 
                  rounded-r-full shadow-lg
                  ml-[-16px] /* Connects to the icon (from the left) */
                  relative z-0 /* LAYER 1 (z-0) */
                "
              >
                {PHONE_NUMBER}
              </div>
            </a>

          </div>
      </body>
    </html>
  )
}