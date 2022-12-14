import { Locale } from 'date-fns';
import localeDe from 'date-fns/locale/de';
import localeEn from 'date-fns/locale/en-US';
import localeRu from 'date-fns/locale/ru';

// Map of locale strings and their date locales
export const dateLocaleMap = new Map<string, Locale>([
  ['de', localeDe],
  ['en', localeEn],
  ['ru', localeRu],
]);
