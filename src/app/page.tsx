import Home from "@/components/Home";
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesoleil.vn'
  const localeUrl = locale === 'vi' ? baseUrl : `${baseUrl}/${locale}`
  
  return {
    alternates: {
      canonical: localeUrl,
    },
  };
}

export default function HomePage() {
  return (
    <main>
      {/* H1 is included in HomeBanner component */}
      <Home />
    </main>
  );
}
