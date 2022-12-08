import { animalAgeNames, animalRatingNames } from 'config/animals';
import { animalNameMap } from 'config/names';
import {
  Animal,
  AnimalActivityValue,
  AnimalAge,
  AnimalRating,
  AnimalType,
} from 'types/animals';
import { EntityGroup } from 'types/global';

/**
 * Find activity defined for the exact hour
 *
 * @param activities List of source activities
 * @param hour Target hour
 */
export const getActivityByHour = (
  activities: Array<AnimalActivityValue>,
  hour: number,
) => activities.find(activity => activity.time === hour);

/**
 * Get human-readable name of the specified animal age
 *
 * @param age Target age
 */
export const getAnimalAgeName = (age: AnimalAge) => animalAgeNames.get(age)!;

/**
 * Group animals by their tier
 *
 * @param animals List of animals to group
 */
export const getAnimalGroups = (animals: Array<Animal>) =>
  getSortedAnimals(animals).reduce<Array<EntityGroup<Animal>>>(
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
 * Get name of animal from a marker
 *
 * @param type Source animal type
 * @param defaultName Default name to use if animal not found
 */
export const getAnimalName = (type?: AnimalType, defaultName = 'Unknown') =>
  type ? animalNameMap.get(type) ?? defaultName : defaultName;

/**
 * Get name of the sex of the specified animal rating
 *
 * @param rating Animal rating
 */
export const getAnimalRatingSexName = (rating: AnimalRating) =>
  animalRatingNames.get(rating)!;

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
  activities: Array<AnimalActivityValue>,
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
 */
const getSortedAnimals = (animals: Array<Animal>) =>
  [...animals].sort((a, b) =>
    a.tier !== b.tier
      ? // First sort by tier
        a.tier - b.tier
      : // Next sort by animal name within the tier
        a.name.localeCompare(b.name),
  );

/**
 * Check if the specified animal sex represents a male
 *
 * @param rating Animal rating
 */
export const isAnimalSexMale = (rating: AnimalRating) => rating !== 'F';
