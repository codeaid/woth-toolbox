module.exports = {
  debug: process.env.NODE_ENV === 'development',
  defaultNS: 'woth',
  fallbackLng: 'en',
  fallbackNS: ['toolbox', 'woth'],
  i18n: {
    defaultLocale: 'en',
    locales: ['de', 'en', 'ru'],
    localeDetection: true,
  },
  keySeparator: false,
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
  ns: ['toolbox', 'woth'],
  nsSeparator: false,
  react: {
    useSuspense: true,
  },
};
