import en_US from 'locales';

// Fallback application locale
export const defaultLocale = 'en';

// Alias to the default language resource
export const defaultResource = en_US;

// Map of language codes and their respective locale directories
export const localeDirectoryMap = new Map<string, string>([
  ['cs', 'cs'],
  ['de', 'de'],
  ['en', 'en'],
  ['es', 'es'],
  ['fr', 'fr'],
  ['hi', 'hi'],
  ['id', 'id'],
  ['it', 'it'],
  ['ja', 'ja'],
  ['pl', 'pl'],
  ['ru', 'ru'],
  ['sk', 'sk'],
  ['tr', 'tr'],
  ['zh', 'zh'],
  ['zh-Hant', 'zh-Hant'],
  ['zh-HK', 'zh-Hant'],
  ['zh-TW', 'zh-Hant'],
]);
