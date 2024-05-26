import en_US from 'locales';
import type {
  AnimalActivity,
  AnimalAge,
  AnimalHabitat,
  AnimalRating,
} from 'types/animals';
import type { MapType } from 'types/cartography';
import type { TranslationKey } from 'types/i18n';
import type {
  MarkerTypeCustom,
  MarkerTypeGeneric,
  MarkerTypeNeedZone,
} from 'types/markers';

// Fallback application locale
export const defaultLocale = 'en';

// Alias to the default language resource
export const defaultResource = en_US;

export const animalActivityTranslationMap = new Map<
  AnimalActivity,
  TranslationKey
>([
  ['drinking', 'ANIMAL:NEED_ZONE_DRINKING'],
  ['feeding', 'ANIMAL:NEED_ZONE_EATING'],
  ['sleeping', 'ANIMAL:NEED_ZONE_RESTING'],
]);

export const animalAgeTranslationMap = new Map<AnimalAge, TranslationKey>([
  ['young', 'ANIMAL:AGE_YOUNG'],
  ['adult', 'ANIMAL:AGE_ADULT'],
  ['mature', 'ANIMAL:AGE_MATURE'],
]);

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

export const animalRatingTranslationMap = new Map<AnimalRating, TranslationKey>(
  [
    ['F', 'ANIMAL:GENDER_FEMALE'],
    ['M1', 'ANIMAL:GENDER_MALE'],
    ['M2', 'ANIMAL:GENDER_MALE'],
    ['M3', 'ANIMAL:GENDER_MALE'],
    ['M4', 'ANIMAL:GENDER_MALE'],
    ['M5', 'ANIMAL:GENDER_MALE'],
  ],
);

export const animalTierTranslationMap = new Map<number, TranslationKey>([
  [1, 'UI:TIER_1'],
  [2, 'UI:TIER_2'],
  [3, 'UI:TIER_3'],
  [4, 'UI:TIER_4'],
  [5, 'UI:TIER_5'],
  [6, 'UI:TIER_6'],
]);

export const animalZoneTranslationMap = new Map<
  MarkerTypeNeedZone,
  TranslationKey
>([
  ['zone:drink', 'ANIMAL:NEED_ZONE_DRINKING'],
  ['zone:eat', 'ANIMAL:NEED_ZONE_EATING'],
  ['zone:sleep', 'ANIMAL:NEED_ZONE_RESTING'],
]);

export const customMarkerTranslationMap = new Map<
  MarkerTypeCustom,
  TranslationKey
>([
  ['marker:exploration', 'UI:MARKER_EXPLORATION'],
  ['marker:level area', 'UI:MARKER_LABELS'],
  ['marker:tracking', 'UI:MARKER_TRACKING'],
]);

export const genericMarkerTranslationMap = new Map<
  MarkerTypeGeneric,
  TranslationKey
>([
  ['cabin', 'TOOLBOX:MARKER_CABIN'],
  ['camp', 'UI:MARKER_CAMPSITE'],
  ['echo', 'UI:MARKER_ECHO'],
  ['flower', 'UI:MARKER_FLOWER'],
  ['hunting stand', 'UI:MARKER_HUNTING_STAND'],
  ['lodge', 'TOOLBOX:MARKER_LODGE'],
  ['parking', 'UI:MARKER_PARKING'],
  ['photo', 'UI:MARKER_PHOTO'],
  ['race', 'TOOLBOX:MARKER_RACE'],
  ['shooting range', 'TOOLBOX:MARKER_SHOOTING_RANGE'],
  ['stamp', 'UI:MARKER_STAMP'],
  ['swing', 'UI:MARKER_SWING'],
  ['view', 'UI:MARKER_VIEW'],
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
  ['nl', 'nl'],
  ['pl', 'pl'],
  ['pt-BR', 'pt-BR'],
  ['ru', 'ru'],
  ['sk', 'sk'],
  ['tr', 'tr'],
  ['zh', 'zh'],
  ['zh-Hant', 'zh-Hant'],
  ['zh-HK', 'zh-Hant'],
  ['zh-TW', 'zh-Hant'],
]);

export const mapTypeTranslationMap = new Map<MapType, TranslationKey>([
  ['africa', 'POI:MAP_NAME_AFRICA'],
  ['alaska', 'POI:MAP_NAME_ALASKA'],
  ['idaho', 'POI:MAP_NAME_IDAHO'],
  ['new-zealand', 'POI:MAP_NAME_NEW_ZEALAND'],
  ['transylvania', 'POI:MAP_NAME_TRANSYLVANIA'],
]);
