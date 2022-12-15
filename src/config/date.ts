import { Locale } from 'date-fns';
import localeCs from 'date-fns/locale/cs';
import localeDe from 'date-fns/locale/de';
import localeEn from 'date-fns/locale/en-US';
import localeEs from 'date-fns/locale/es';
import localeFr from 'date-fns/locale/fr';
import localeHi from 'date-fns/locale/hi';
import localeId from 'date-fns/locale/id';
import localeIt from 'date-fns/locale/it';
import localeJa from 'date-fns/locale/ja';
import localePl from 'date-fns/locale/pl';
import localeRu from 'date-fns/locale/ru';
import localeSk from 'date-fns/locale/sk';
import localeTr from 'date-fns/locale/tr';
import localeZhHans from 'date-fns/locale/zh-CN';
import localeZhHant from 'date-fns/locale/zh-HK';

// Map of locale strings and their date locales
export const dateLocaleMap = new Map<string, Locale>([
  ['cs', localeCs],
  ['de', localeDe],
  ['en', localeEn],
  ['es', localeEs],
  ['fr', localeFr],
  ['hi', localeHi],
  ['id', localeId],
  ['it', localeIt],
  ['ja', localeJa],
  ['pl', localePl],
  ['ru', localeRu],
  ['sk', localeSk],
  ['tr', localeTr],
  ['zh', localeZhHans],
  ['zh-hant', localeZhHant],
]);
