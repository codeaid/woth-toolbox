import en_US from 'locales';

// Fallback application locale
export const defaultLocale = 'en';

// Alias to the default language resource
export const defaultResource = en_US;

// Map of language codes and their respective locale directories
export const languageDirectoryMap = new Map<string, string>([
  ['cs', 'cs-CZ'],
  ['de', 'de-DE'],
  ['en', 'en-US'],
  ['es', 'es-ES'],
  ['fr', 'fr-FR'],
  ['hi', 'hi-IN'],
  ['id', 'id-ID'],
  ['it', 'it-IT'],
  ['ja', 'ja-JP'],
  ['pl', 'pl-PL'],
  ['ru', 'ru-RU'],
  ['sk', 'sk-SK'],
  ['tr', 'tr-TR'],
  ['zh', 'zh-Hans'],
  ['zh-CN', 'zh-Hans'],
  ['zh-HK', 'zh-Hant'],
  ['zh-TW', 'zh-Hant'],
]);
