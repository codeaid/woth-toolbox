module.exports = {
  debug: process.env.NODE_ENV === 'development',
  defaultNS: 'woth',
  fallbackLng: 'en',
  fallbackNS: ['toolbox', 'woth'],
  i18n: {
    defaultLocale: 'en',
    locales: [
      'cs',
      'de',
      'en',
      'es',
      'fr',
      'hi',
      'id',
      'it',
      'ja',
      'pl',
      'ru',
      'sk',
      'tr',
      'zh',
      'zh-hant',
    ],
    localeDetection: true,
  },
  keySeparator: false,
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
  lowerCaseLng: true,
  ns: ['toolbox', 'woth'],
  nsSeparator: false,
  react: {
    useSuspense: true,
  },
};
