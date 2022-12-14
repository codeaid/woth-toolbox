import {
  Animal,
  AnimalActivityData,
  AnimalAge,
  AnimalRating,
  AnimalSpecimen,
} from 'types/animals';
import { EntityGroup } from 'types/global';
import { Translator } from 'types/i18n';

/**
 * Find activity defined for the exact hour
 *
 * @param activities List of source activities
 * @param hour Target hour
 */
export const getActivityByHour = (
  activities: Array<AnimalActivityData>,
  hour: number,
) => activities.find(activity => activity.time === hour);

/**
 * Group animals by their tier
 *
 * @param animals List of animals to group
 * @param translator Translator
 */
export const getAnimalGroups = (
  animals: Array<Animal>,
  translator: Translator,
) =>
  getSortedAnimals(animals, translator).reduce<Array<EntityGroup<Animal>>>(
    (groups, animal) => {
      // Attempt to find the existing group for the current tier
      const group = groups.find(g => g.tier === animal.tier);

      // Create a new group if it doesn't exist
      if (!group) {
        return [...groups, { entities: [animal], tier: animal.tier }];
      }

      return groups.map(group => {
        // Update existing group by adding the animal
        if (group.tier === animal.tier) {
          return { ...group, entities: [...group.entities, animal] };
        }

        return group;
      });
    },
    [],
  );

/**
 * Get number of stars for the specified animal (trophy) rating
 *
 * @param rating Source rating value
 */
export const getAnimalRatingTrophy = (rating: AnimalRating) => {
  switch (rating) {
    case 'M1':
      return 1;
    case 'M2':
      return 2;
    case 'M3':
      return 3;
    case 'M4':
      return 4;
    case 'M5':
      return 5;
    default:
      return 0;
  }
};

/**
 * Find activity occurring at the specified hour
 *
 * @param activities List of source activities
 * @param hour Target hour
 */
export const getCurrentActivityByHour = (
  activities: Array<AnimalActivityData>,
  hour: number,
) => {
  let current;

  // Sort activities by hour
  const sortedActivities = [...activities].sort((a, b) => a.time - b.time);

  // Find the latest activity occurring at the specified hour
  for (const activity of sortedActivities) {
    if (activity.time > hour) {
      break;
    }

    current = activity;
  }

  return current;
};

/**
 * Sort animals first by tier and then by name
 *
 * @param animals List of animals to sort
 * @param translator Translator
 */
const getSortedAnimals = (animals: Array<Animal>, translator: Translator) =>
  [...animals].sort((a, b) =>
    a.tier !== b.tier
      ? // First sort by tier
        a.tier - b.tier
      : // Next sort by animal name within the tier
        translator(a.heading).localeCompare(translator(b.heading)),
  );

/**
 * Sort list of specimens by sex, then by maturity and then by trophy rating
 *
 * @param specimens List of specimens to sort
 */
export const getSortedAnimalSpecimens = (specimens: Array<AnimalSpecimen>) => {
  // Map of age sort values
  const map: Record<AnimalAge, number> = {
    young: 1,
    adult: 2,
    mature: 3,
  };

  // Sort males to the top (by star ratings
  return specimens.sort((a, b) => {
    const patternA = `${a.rating[0]}:${map[a.age]}:${a.rating[1]}`;
    const patternB = `${b.rating[0]}:${map[b.age]}:${b.rating[1]}`;
    return patternB.localeCompare(patternA);
  });
};

/**
 * Check if the specified animal sex represents a male
 *
 * @param rating Animal rating
 */
export const isAnimalSexMale = (rating: AnimalRating) => rating !== 'F';
