import type { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'utilities' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesoleildanang.com'
  const localeUrl = locale === 'vi' ? `${baseUrl}/facility` : `${baseUrl}/${locale}/facility`
  
  return {
    title: t('title'),
    description: `Premium facilities at Wyndham Soleil Đà Nẵng: ${t('title-1')}, ${t('title-2')}, ${t('title-3')}, ${t('title-4')}, ${t('title-5')}, ${t('title-6')}`,
    alternates: {
      canonical: localeUrl,
      languages: {
        'vi': `${baseUrl}/facility`,
        'en': `${baseUrl}/en/facility`,
      },
    },
    openGraph: {
      title: t('title'),
      description: `Premium facilities at Wyndham Soleil Đà Nẵng`,
      url: localeUrl,
      images: [
        {
          url: `${baseUrl}/images/home/cover-pool.png`,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
  };
}

export default function Page() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl font-semibold">Facility</h1>
      <p className="mt-4 text-base text-gray-600 dark:text-gray-300">Content coming soon.</p>
    </main>
  )
}


