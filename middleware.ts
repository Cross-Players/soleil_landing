import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'vi'],
  defaultLocale: 'vi',
  // Only prefix non-default locales (so 'vi' has no prefix)
  localePrefix: 'as-needed'
})

export const config = {
  matcher: ['/', '/(en|vi)/:path*']
}


