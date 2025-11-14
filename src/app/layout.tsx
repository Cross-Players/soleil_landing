import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader';
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, getLocale } from 'next-intl/server'
import Toaster from '@/components/Toaster'
import Image from 'next/image' // <-- 1. IMPORT IMAGE
import { ReactNode } from 'react' // <-- 2. IMPORT REACTNODE

const font = Montserrat({ subsets: ["latin"], weight: ["300","400","500","600","700","800"] });

// 3. FIX METADATA FUNCTION (Must accept params)
export async function generateMetadata({
  params
}: {
  params?: Promise<{ locale?: string }>
}): Promise<Metadata> {
  // Get locale from params if available, otherwise use getLocale()
  const paramsData = params ? await params : null;
  const localeFromParams = paramsData?.locale;
  const resolvedLocale = localeFromParams || await getLocale() || 'vi';
  // Ensure locale is always 'vi' or 'en'
  const locale = (resolvedLocale === 'en' || resolvedLocale === 'vi') ? resolvedLocale : 'vi';
  
  const t = await getTranslations({ locale, namespace: 'meta' })
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesoleil.vn'
  const siteName = 'The Soleil Đà Nẵng'
  const title = t('title')
  const description = t('description')
  const localeUrl = locale === 'vi' ? baseUrl : `${baseUrl}/${locale}`
  
  return {
    title: {
      default: title,
      template: `%s | ${siteName}`
    },
    description,
    keywords: [
      'Wyndham Soleil Đà Nẵng',
      'căn hộ Đà Nẵng',
      'chung cư cao cấp Đà Nẵng',
      'bất động sản Đà Nẵng',
      'căn hộ ven biển',
      'Wyndham Hotel',
      'Da Nang apartments',
      'luxury apartments Da Nang',
      'real estate Da Nang'
    ],
    authors: [{ name: 'PPC An Thịnh Đà Nẵng' }],
    creator: 'PPC An Thịnh Đà Nẵng',
    publisher: 'PPC An Thịnh Đà Nẵng',
    metadataBase: new URL(baseUrl),
    alternates: {
      // Don't set canonical here - let each page set its own canonical URL
      // canonical: localeUrl,
      languages: {
        'vi': baseUrl,
        'en': `${baseUrl}/en`,
        'x-default': baseUrl,
        [locale]: localeUrl // Self-referential alternate link (locale is guaranteed to be 'vi' or 'en')
      }
    },
    openGraph: {
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      url: localeUrl,
      siteName,
      title,
      description,
      images: [
        {
          url: `${baseUrl}/images/home/cover-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/home/cover-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add your verification codes here when available
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // yahoo: 'your-yahoo-verification-code',
    },
  }
}

// 4. FIX ROOTLAYOUT FUNCTION (Must accept params)
export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: ReactNode;
  params?: Promise<{ locale?: string }>; // <-- Make params optional
}>) {
  // Get locale from params if available, otherwise use getLocale()
  const paramsData = params ? await params : null;
  const localeFromParams = paramsData?.locale;
  const resolvedLocale = localeFromParams || await getLocale() || 'vi';
  // Ensure locale is always 'vi' or 'en'
  const locale = (resolvedLocale === 'en' || resolvedLocale === 'vi') ? resolvedLocale : 'vi';
  
  // const locale = await getLocale() // <-- This line is no longer needed
  const messages = await getMessages()
  const t = await getTranslations({ locale, namespace: 'meta' })
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesoleil.vn'
  const description = t('description')

  // --- 5. ADD CONTACT CONSTANTS ---
  const ZALO_LINK = "https://zalo.me/0345747138";
  const PHONE_NUMBER = "0345.747.138"; // Formatted for display
  const PHONE_LINK = "tel:0345747138";
  // --- END OF CONTACT CONSTANTS ---

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ResidentialComplex',
    name: 'The Soleil Đà Nẵng',
    alternateName: 'Wyndham Soleil Đà Nẵng',
    description: description,
    url: baseUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Số 02, Phạm Văn Đồng, Phường An Hải',
      addressLocality: 'Đà Nẵng',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '16.0583',
      longitude: '108.2278',
    },
    developer: {
      '@type': 'Organization',
      name: 'Công Ty Cổ Phần PPC An Thịnh Đà Nẵng',
      url: baseUrl,
    },
    operator: {
      '@type': 'Organization',
      name: 'Wyndham Hotel Group',
    },
    numberOfUnits: {
      '@type': 'QuantitativeValue',
      value: 'Multiple towers with various apartment types',
    },
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Infinity Pool',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Gym',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Spa',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Restaurant',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Shopping Center',
        value: true,
      },
    ],
    image: `${baseUrl}/images/home/cover-image.jpg`,
    telephone: '+84345747138',
    email: 'Thesoleildanangofficial@gmail.com',
  }

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
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