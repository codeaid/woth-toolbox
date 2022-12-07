import { animalNameMap } from 'config/names';
import { Animal, AnimalActivityValue } from 'types/animals';
import { EntityGroup } from 'types/global';
import { AnimalMarkerOptions } from 'types/markers';

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
 * @param marker Source animal marker options
 * @param defaultName Default name to use if animal not found
 */
export const getAnimalName = (
  marker?: AnimalMarkerOptions,
  defaultName = 'Unknown',
) => (marker ? animalNameMap.get(marker.type) ?? defaultName : defaultName);

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
