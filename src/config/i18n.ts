import en_US from 'locales';
import { AnimalHabitat } from 'types/animals';
import { TranslationKey } from 'types/i18n';

// Fallback application locale
export const defaultLocale = 'en';

// Alias to the default language resource
export const defaultResource = en_US;

// Animal habitat translation map
export const animalHabitatTranslationMap = new Map<
  AnimalHabitat,
  TranslationKey
>([
  ['arid savannah and desert', 'POI:AFRICA_HABITAT_DESERT'],
  ['floodplain', 'POI:TRANSYLVANIA_HABITAT_01'],
  ['grassland', 'POI:IDAHO_HABITAT_02'],
  ['grasslands and forests', 'POI:AFRICA_HABITAT_GRASSLANDS'],
  ['highland forest', 'POI:IDAHO_HABITAT_04'],
  ['highlands', 'POI:AFRICA_HABITAT_HIGHLANDS'],
  ['lowland forest', 'POI:IDAHO_HABITAT_03'],
  ['mountains', 'POI:IDAHO_HABITAT_05'],
  ['rainforest', 'POI:ALASKA_HABITAT_01'],
  ['savanna', 'POI:AFRICA_HABITAT_SAVANNA'],
  ['swamps', 'POI:IDAHO_HABITAT_01'],
]);

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
