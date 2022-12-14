import { animals, birds } from 'config/animals';
import {
  AnimalActivity,
  AnimalAge,
  AnimalRating,
  AnimalType,
} from 'types/animals';
import { TranslationKey } from 'types/i18n';
import { MarkerTypeNeedZone } from 'types/markers';

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
