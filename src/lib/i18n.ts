import { getUserLocales } from 'get-user-locale';
import { animals, birds } from 'config/animals';
import {
  defaultLocale,
  defaultResource,
  localeDirectoryMap,
} from 'config/i18n';
import {
  AnimalActivity,
  AnimalAge,
  AnimalRating,
  AnimalType,
} from 'types/animals';
import { TranslationKey, TranslationResource } from 'types/i18n';
import {
  MarkerType,
  MarkerTypeGeneric,
  MarkerTypeNeedZone,
} from 'types/markers';
import {
  isAnimalMarkerType,
  isGenericMarkerType,
  isNeedZoneMarkerType,
} from 'lib/markers';

/**
 * Get animal's activity translation key
 *
 * @param activity Target animal activity
 */
export const getAnimalActivityKey = (
  activity?: AnimalActivity,
): TranslationKey => {
  switch (activity) {
    case AnimalActivity.Drinking:
      return 'ANIMAL:NEED_ZONE_DRINKING';
    case AnimalActivity.Feeding:
      return 'ANIMAL:NEED_ZONE_EATING';
    case AnimalActivity.Sleeping:
      return 'ANIMAL:NEED_ZONE_RESTING';
    default:
      throw new Error(`Invalid animal activity specified: ${activity}`);
  }
};

/**
 * Get animal's age translation key
 *
 * @param age Target animal age
 */
export const getAnimalAgeKey = (age?: AnimalAge): TranslationKey => {
  switch (age) {
    case 'young':
      return 'ANIMAL:AGE_YOUNG';
    case 'adult':
      return 'ANIMAL:AGE_ADULT';
    case 'mature':
      return 'ANIMAL:AGE_MATURE';
    default:
      throw new Error(`Invalid animal age type specified: ${age}`);
  }
};

/**
 * Get animal's rating translation key
 *
 * @param rating Target animal rating
 */
export const getAnimalRatingGenderKey = (
  rating?: AnimalRating,
): TranslationKey => {
  switch (rating) {
    case 'F':
      return 'ANIMAL:GENDER_FEMALE';
    case 'M1':
    case 'M2':
    case 'M3':
    case 'M4':
    case 'M5':
      return 'ANIMAL:GENDER_MALE';
    default:
      throw new Error(`Invalid animal rating specified: ${rating}`);
  }
};

/**
 * Get animal's type translation key
 *
 * @param type Target animal type
 */
export const getAnimalTypeKey = (type: AnimalType) => {
  // Find animal matching the type
  const animal = [...animals, ...birds].find(animal => animal.type === type);

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
export const getAnimalZoneKey = (type?: MarkerTypeNeedZone): TranslationKey => {
  switch (type) {
    case 'zone:drink':
      return 'ANIMAL:NEED_ZONE_DRINKING';
    case 'zone:eat':
      return 'ANIMAL:NEED_ZONE_EATING';
    case 'zone:sleep':
      return 'ANIMAL:NEED_ZONE_RESTING';
    default:
      throw new Error(`Invalid need zone type specified: ${type}`);
  }
};

/**
 * Get generic marker type translation key
 *
 * @param type Target marker type
 */
export const getGenericMarkerKey = (
  type: MarkerTypeGeneric,
): TranslationKey => {
  switch (type) {
    case 'cabin':
      return 'TOOLBOX:MARKER_CABIN';
    case 'camp':
      return 'UI:MARKER_CAMPSITE';
    case 'echo':
      return 'UI:MARKER_ECHO';
    case 'hunting stand':
      return 'UI:MARKER_HUNTING_STAND';
    case 'lodge':
      return 'TOOLBOX:MARKER_LODGE';
    case 'photo':
      return 'UI:MARKER_PHOTO';
    case 'shooting range':
      return 'TOOLBOX:MARKER_SHOOTING_RANGE';
    case 'view':
      return 'UI:MARKER_VIEW';
    default:
      throw new Error(`Invalid generic marker type specified: ${type}`);
  }
};

/**
 * Get marker type translation key
 *
 * @param type Target marker type
 */
export const getMarkerKey = (type?: MarkerType) => {
  if (isAnimalMarkerType(type)) {
    return getAnimalTypeKey(type);
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
export const getTierKey = (tier: number): TranslationKey => {
  switch (tier) {
    case 1:
      return 'UI:TIER1';
    case 2:
      return 'UI:TIER2';
    case 3:
      return 'UI:TIER3';
    case 4:
      return 'UI:TIER4';
    case 5:
      return 'UI:TIER5';
    case 6:
      return 'UI:TIER6';
    default:
      throw new Error(`Invalid tier specified: ${tier}`);
  }
};

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
