import { getCoordinateHash } from 'lib/markers';
import { AnimalType } from 'types/animals';
import { AnimalMarkerOptions, MarkerPosition } from 'types/markers';

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
export const createMarkerOptionSnippet = (
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

/**
 * Create animal marker creation snipped from a marker object
 *
 * @param marker Source animal marker object
 */
export const getAnimalMarkerCreateCode = (marker: AnimalMarkerOptions) => `
createAnimalMarkerOptions(
  '${marker.type}',
  ${JSON.stringify(marker.coords)},
  ${JSON.stringify(marker.drink.map(zone => zone.coords))},
  ${JSON.stringify(marker.eat.map(zone => zone.coords))},
  ${JSON.stringify(marker.sleep.map(zone => zone.coords))},
),`;

/**
 * Check if an animal marker contains the specified coordinates
 *
 * @param marker Source marker
 * @param coords Coordinates to look up
 */
const hasNeedZoneCoordinates = (
  marker: AnimalMarkerOptions,
  coords: MarkerPosition,
) =>
  [marker.drink, marker.eat, marker.sleep]
    .flat()
    .some(zone => zone.coords[0] == coords[0] && zone.coords[1] == coords[1]);

/**
 * Check if all marker's need zones have been populated
 *
 * @param marker Source animal marker
 * @param drinkZoneCount Expected number of drink zones
 * @param eatZoneCount Expected number of eat zones
 * @param sleepZoneCount Expected number of sleep zones
 */
export const isMarkerComplete = (
  marker: AnimalMarkerOptions,
  drinkZoneCount: number,
  eatZoneCount: number,
  sleepZoneCount: number,
) =>
  marker.coords.length === 2 &&
  marker.drink.length === drinkZoneCount &&
  marker.eat.length === eatZoneCount &&
  marker.sleep.length === sleepZoneCount;

/**
 * Add a new drink zone to the specified marker
 *
 * @param marker Target marker
 * @param coords Zone coordinates
 */
export const pushMarkerDrinkZone = (
  marker: AnimalMarkerOptions,
  coords: MarkerPosition,
): AnimalMarkerOptions => ({
  ...marker,
  drink: marker.drink.concat({ coords, type: 'zone:drink' }),
});

/**
 * Add a new eat zone to the specified marker
 *
 * @param marker Target marker
 * @param coords Zone coordinates
 */
export const pushMarkerEatZone = (
  marker: AnimalMarkerOptions,
  coords: MarkerPosition,
): AnimalMarkerOptions => ({
  ...marker,
  eat: marker.eat.concat({ coords, type: 'zone:eat' }),
});

/**
 * Add a new sleep zone to the specified marker
 *
 * @param marker Target marker
 * @param coords Zone coordinates
 */
export const pushMarkerSleepZone = (
  marker: AnimalMarkerOptions,
  coords: MarkerPosition,
): AnimalMarkerOptions => ({
  ...marker,
  sleep: marker.sleep.concat({ coords, type: 'zone:sleep' }),
});

/**
 * Inject need zone coordinates into the next applicable zone type
 *
 * @param marker Target animal marker
 * @param type Target animal type
 * @param drinkZoneCount Expected number of drink zones
 * @param eatZoneCount Expected number of eat zones
 * @param sleepZoneCount Expected number of sleep zones
 * @param coords Marker position
 */
export const pushNextMarkerCoords = (
  marker: Optional<AnimalMarkerOptions>,
  type: AnimalType,
  drinkZoneCount: number,
  eatZoneCount: number,
  sleepZoneCount: number,
  coords: MarkerPosition,
): AnimalMarkerOptions => {
  // Create a new marker
  if (!marker) {
    return {
      coords,
      debug: {},
      drink: [],
      eat: [],
      id: getCoordinateHash(coords),
      sleep: [],
      type,
    };
  }

  // Push coordinates into the appropriate zone type
  if (hasNeedZoneCoordinates(marker, coords)) {
    return marker;
  } else if (marker.drink.length < drinkZoneCount) {
    return pushMarkerDrinkZone(marker, coords);
  } else if (marker.eat.length < eatZoneCount) {
    return pushMarkerEatZone(marker, coords);
  } else if (marker.sleep.length < sleepZoneCount) {
    return pushMarkerSleepZone(marker, coords);
  }

  return marker;
};

/**
 * Remove a marker from the list
 *
 * @param markers List of markers to update
 * @param marker Marker to remove
 */
export const removeMarker = (
  markers: Array<AnimalMarkerOptions>,
  marker: AnimalMarkerOptions,
) => markers.filter(m => m.id !== marker.id);

/**
 * Remove drink zone with the specified index from an animal marker
 *
 * @param marker Marker to update
 * @param index Target index to remove
 */
export const removeMarkerDrinkZone = (
  marker: AnimalMarkerOptions,
  index: number,
): AnimalMarkerOptions => ({
  ...marker,
  drink: marker.drink.filter((_, i) => i !== index),
});

/**
 * Remove eat zone with the specified index from an animal marker
 *
 * @param marker Marker to update
 * @param index Target index to remove
 */
export const removeMarkerEatZone = (
  marker: AnimalMarkerOptions,
  index: number,
): AnimalMarkerOptions => ({
  ...marker,
  eat: marker.eat.filter((_, i) => i !== index),
});

/**
 * Remove sleep zone with the specified index from an animal marker
 *
 * @param marker Marker to update
 * @param index Target index to remove
 */
export const removeMarkerSleepZone = (
  marker: AnimalMarkerOptions,
  index: number,
): AnimalMarkerOptions => ({
  ...marker,
  sleep: marker.sleep.filter((_, i) => i !== index),
});

/**
 * Replace marker with another on in the specified list
 *
 * @param markers List of markers to update
 * @param marker Marker to replace
 */
export const replaceMarker = (
  markers: Array<AnimalMarkerOptions>,
  marker: AnimalMarkerOptions,
) => markers.map(m => (m.id === marker.id ? marker : m));
