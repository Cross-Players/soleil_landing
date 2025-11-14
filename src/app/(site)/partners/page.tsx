import type { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'partners' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesoleildanang.com'
  const localeUrl = locale === 'vi' ? `${baseUrl}/partners` : `${baseUrl}/${locale}/partners`
  
  return {
    title: 'Partners',
    description: `Our trusted partners: ${t('partners-title-1')}, ${t('partners-title-2')}, ${t('partners-title-3')}`,
    alternates: {
      canonical: localeUrl,
      languages: {
        'vi': `${baseUrl}/partners`,
        'en': `${baseUrl}/en/partners`,
      },
    },
    openGraph: {
      title: 'Partners',
      description: `Our trusted partners at Wyndham Soleil Đà Nẵng`,
      url: localeUrl,
      images: [
        {
          url: `${baseUrl}/images/home/aedas-logo.png`,
          width: 1200,
          height: 630,
          alt: 'Partners',
        },
      ],
    },
  };
}

export default function Page() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl font-semibold">Partners</h1>
      <p className="mt-4 text-base text-gray-600 dark:text-gray-300">Content coming soon.</p>
    </main>
  )
}


