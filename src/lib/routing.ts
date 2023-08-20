import { fauna } from 'config/animals';
import { baseUrlAnimals } from 'config/routing';
import { AnimalType } from 'types/animals';
import { NextRouter } from 'next/router';

/**
 * Redirect to the details page of the specified animal
 *
 * @param type Target animal type
 * @param router Application router
 */
export const redirectToAnimalPage = async (
  type: AnimalType,
  router: NextRouter,
) => {
  // Build base URL object for the animals page and add target animal as the search parameter
  const url = new URL(baseUrlAnimals, window.location.href);
  url.searchParams.append('q', getAnimalUrlSlug(type));

  await router.push(url.toString());
};

/**
 * Retrieve URL slug for the specified animal type
 *
 * @param type Target animal type
 */
const getAnimalUrlSlug = (type: AnimalType) => {
  const animal = fauna.find(animal => animal.type === type);

  if (!animal) {
    throw new Error(`Animal configuration for '${type}' not found`);
  }

  return animal.slug;
};
