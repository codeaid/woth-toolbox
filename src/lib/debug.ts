import { AnimalType } from 'types/animals';
import { MarkerPosition } from 'types/markers';

/**
 * Log to console without printing the file name or line number
 *
 * @param params Console logger parameters
 */
export const consoleLogClean = (...params: Array<any>) =>
  setTimeout(console.log.bind(console, ...params));

/**
 * Generate marker option registration code snippet
 *
 * @param animalType Target animal type
 * @param positions List of marker positions to process
 * @param drinkZoneCount Number of drink zones to print
 * @param eatZoneCount Number of feed zones to print
 * @param sleepZoneCount Number of sleep zones to print
 */
export const getMarkerOptionSnippet = (
  animalType: AnimalType,
  positions: Array<MarkerPosition>,
  drinkZoneCount: number,
  eatZoneCount: number,
  sleepZoneCount: number,
) => {
  // Split the list of coordinates into zone chunks
  const [coords] = positions.splice(0, 1);
  const drink = positions.splice(0, drinkZoneCount);
  const eat = positions.splice(0, eatZoneCount);
  const sleep = positions.splice(0, sleepZoneCount);

  return `createAnimalMarkerOptions(
  '${animalType}',
  ${JSON.stringify(coords)},
  ${JSON.stringify(drink)},
  ${JSON.stringify(eat)},
  ${JSON.stringify(sleep)},
),`;
};

/**
 * Copy text to clipboard
 *
 * @param text Text to copy
 */
export const copyTextToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {}
};
