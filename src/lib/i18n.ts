import { getUserLocales } from 'get-user-locale';
import { fauna } from 'config/animals';
import {
  animalActivityTranslationMap,
  animalAgeTranslationMap,
  animalHabitatTranslationMap,
  animalRatingTranslationMap,
  animalTierTranslationMap,
  animalZoneTranslationMap,
  customMarkerTranslationMap,
  defaultLocale,
  defaultResource,
  genericMarkerTranslationMap,
  localeDirectoryMap,
} from 'config/i18n';
import {
  isAnimalMarkerType,
  isCustomMarkerType,
  isGenericMarkerType,
  isNeedZoneMarkerType,
} from 'lib/markers';
import type {
  AnimalActivity,
  AnimalAge,
  AnimalHabitat,
  AnimalRating,
  AnimalType,
} from 'types/animals';
import type { TranslationKey, TranslationResource } from 'types/i18n';
import type {
  MarkerType,
  MarkerTypeCustom,
  MarkerTypeGeneric,
  MarkerTypeNeedZone,
} from 'types/markers';

/**
 * Get animal's activity translation key
 *
 * @param activity Target animal activity
 */
export const getAnimalActivityKey = (activity?: AnimalActivity) =>
  tryGetTranslationKey(
    animalActivityTranslationMap,
    activity,
    `Invalid animal activity specified: ${activity}`,
  );

/**
 * Get animal's age translation key
 *
 * @param age Target animal age
 */
export const getAnimalAgeKey = (age?: AnimalAge): TranslationKey =>
  tryGetTranslationKey(
    animalAgeTranslationMap,
    age,
    `Invalid animal age type specified: ${age}`,
  );

/**
 * Get animal's habitat translation key
 *
 * @param habitat Target animal habitat
 */
export const getAnimalHabitatKey = (habitat: AnimalHabitat): TranslationKey =>
  tryGetTranslationKey(
    animalHabitatTranslationMap,
    habitat,
    `Invalid animal habitat type specified: ${habitat}`,
  );

/**
 * Get animal's rating translation key
 *
 * @param rating Target animal rating
 */
export const getAnimalRatingGenderKey = (rating?: AnimalRating) =>
  tryGetTranslationKey(
    animalRatingTranslationMap,
    rating,
    `Invalid animal rating specified: ${rating}`,
  );

/**
 * Get animal's type translation key
 *
 * @param type Target animal type
 */
export const getAnimalTypeKey = (type: AnimalType) => {
  // Find animal matching the type
  const animal = fauna.find(animal => animal.type === type);

  if (!animal) {
    throw new Error(`Specified animal does not exist: ${type}`);
  }

  return animal.heading;
};

/**
 * Get animal's need zone type translation key
 *
 * @param type Target zone type
 */
export const getAnimalZoneKey = (type?: MarkerTypeNeedZone): TranslationKey =>
  tryGetTranslationKey(
    animalZoneTranslationMap,
    type,
    `Invalid need zone type specified: ${type}`,
  );

/**
 * Get custom marker type translation key
 *
 * @param type Target zone type
 */
export const getCustomMarkerKey = (type?: MarkerTypeCustom): TranslationKey =>
  tryGetTranslationKey(
    customMarkerTranslationMap,
    type,
    `Invalid need zone type specified: ${type}`,
  );

/**
 * Get generic marker type translation key
 *
 * @param type Target marker type
 */
export const getGenericMarkerKey = (type: MarkerTypeGeneric) =>
  tryGetTranslationKey(
    genericMarkerTranslationMap,
    type,
    `Invalid generic marker type specified: ${type}`,
  );

/**
 * Get marker type translation key
 *
 * @param type Target marker type
 */
export const getMarkerKey = (type?: MarkerType) => {
  if (isAnimalMarkerType(type)) {
    return getAnimalTypeKey(type);
  } else if (isCustomMarkerType(type)) {
    return getCustomMarkerKey(type);
  } else if (isGenericMarkerType(type)) {
    return getGenericMarkerKey(type);
  } else if (isNeedZoneMarkerType(type)) {
    return getAnimalZoneKey(type);
  }

  throw new Error(
    `Specified marker type does not have associated translations: ${type}`,
  );
};

/**
 * Get tier level translation key
 *
 * @param tier Target tier
 */
export const getTierKey = (tier: number) =>
  tryGetTranslationKey(
    animalTierTranslationMap,
    tier,
    `Invalid tier specified: ${tier}`,
  );

/**
 * Get application locale corresponding to current browser's locale
 */
export const getBrowserLocale = () => {
  // Get detected locale code
  const locales = getUserLocales();

  // Iterate through all user locales and attempt to find one that has resources
  for (const locale of locales) {
    // Check if detected locale has a direct map to a resource directory
    if (localeDirectoryMap.has(locale)) {
      return locale;
    }

    // Check if locale's language has a resource map and use it if it does
    const language = new Intl.Locale(locale).language;
    if (localeDirectoryMap.has(language)) {
      return language;
    }
  }

  // None of the user locales is supported, use default locale
  return defaultLocale;
};

/**
 * Get name of directory used to store specified locale's resource files
 *
 * @param locale Target locale
 */
const getLocaleDirectory = (locale: string) => {
  // Check if a directory map exists for the specified locale and return it if it does
  const directory = localeDirectoryMap.get(locale);
  if (directory) {
    return directory;
  }

  // Name of the directory to use when none of the locales are supported
  const defaultDirectory = localeDirectoryMap.get(defaultLocale);
  if (!defaultDirectory) {
    throw new Error(
      `Default locale has no resource directory mapped: ${defaultLocale}`,
    );
  }

  return defaultDirectory;
};

/**
 * Dynamically load translation messages associated with the specified locale
 *
 * @param locale Target locale
 */
export const getLocaleMessagesAsync = async (locale: string) => {
  // Determine which directory contains resources files associated with the locale
  const directory = getLocaleDirectory(locale);

  // Avoid loading default language resource file as it's already compiled
  if (locale === defaultLocale) {
    return defaultResource;
  }

  // Load resource module and merge its contents with the default language
  const resourceModule = await import(
    /* webpackChunkName: 'resource' */ `locales/${directory}`
  );

  return {
    ...defaultResource,
    ...resourceModule.default,
  } as TranslationResource;
};

/**
 * Attempt to retrieve a translation key from the specified type/translation map
 *
 * @param map Source translation key map
 * @param key Target translation key whose associated translation key to extract
 * @param errorMessage Message of the error to throw in case of a failed lookup
 */
const tryGetTranslationKey = <T>(
  map: Map<T, TranslationKey>,
  key: Optional<T>,
  errorMessage: string,
): TranslationKey => {
  if (typeof key === 'undefined' || !map.has(key)) {
    throw new Error(errorMessage);
  }

  return map.get(key)!;
};
