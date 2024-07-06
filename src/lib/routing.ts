import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { NextRouter } from 'next/router';
import { fauna } from 'config/animals';
import {
  baseUrlAfrica,
  baseUrlAlaska,
  baseUrlAnimals,
  baseUrlIdaho,
  baseUrlNewZealand,
  baseUrlTransylvania,
} from 'config/routing';
import type { AnimalType } from 'types/animals';

/**
 * Detect if the specified page URL represents a map page
 *
 * @param href Page URL to validate
 */
export const isMapUrl = (href: string) => {
  const mapUrls = [
    baseUrlAfrica,
    baseUrlAlaska,
    baseUrlIdaho,
    baseUrlNewZealand,
    baseUrlTransylvania,
  ];

  const url = new URL(href);
  return mapUrls.includes(url.pathname);
};

/**
 * Redirect to the details page of the specified animal
 *
 * @param type Target animal type
 * @param router Application router
 */
export const redirectToAnimalPage = (
  type: AnimalType,
  router: AppRouterInstance,
) => {
  const url = `${baseUrlAnimals}?q=${getAnimalUrlSlug(type)}`;
  router.push(url);
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
