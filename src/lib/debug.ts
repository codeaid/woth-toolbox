import { getCoordinateHash } from 'lib/markers';
import { AnimalType } from 'types/animals';
import { Point } from 'types/generic';
import { MarkerOptionsAnimal } from 'types/markers';

/**
 * Log to console without printing the file name or line number
 *
 * @param params Console logger parameters
 */
export const consoleLogClean = (...params: Array<any>) =>
  setTimeout(console.log.bind(console, ...params));

/**
 * Create animal marker creation snipped from a marker object
 *
 * @param marker Source animal marker object
 */
export const getAnimalMarkerCreateCode = (marker: MarkerOptionsAnimal) => `
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
const hasNeedZoneCoordinates = (marker: MarkerOptionsAnimal, coords: Point) =>
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
  marker: MarkerOptionsAnimal,
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
  marker: MarkerOptionsAnimal,
  coords: Point,
): MarkerOptionsAnimal => ({
  ...marker,
  drink: marker.drink.concat({
    coords,
    id: getCoordinateHash(coords),
    type: 'zone:drink',
  }),
});

/**
 * Add a new eat zone to the specified marker
 *
 * @param marker Target marker
 * @param coords Zone coordinates
 */
export const pushMarkerEatZone = (
  marker: MarkerOptionsAnimal,
  coords: Point,
): MarkerOptionsAnimal => ({
  ...marker,
  eat: marker.eat.concat({
    coords,
    id: getCoordinateHash(coords),
    type: 'zone:eat',
  }),
});

/**
 * Add a new sleep zone to the specified marker
 *
 * @param marker Target marker
 * @param coords Zone coordinates
 */
export const pushMarkerSleepZone = (
  marker: MarkerOptionsAnimal,
  coords: Point,
): MarkerOptionsAnimal => ({
  ...marker,
  sleep: marker.sleep.concat({
    coords,
    id: getCoordinateHash(coords),
    type: 'zone:sleep',
  }),
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
  marker: Optional<MarkerOptionsAnimal>,
  type: AnimalType,
  drinkZoneCount: number,
  eatZoneCount: number,
  sleepZoneCount: number,
  coords: Point,
): MarkerOptionsAnimal => {
  // Create a new marker
  if (!marker) {
    return {
      coords,
      meta: {
        debug: true,
      },
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
  markers: Array<MarkerOptionsAnimal>,
  marker: MarkerOptionsAnimal,
) => markers.filter(m => m.id !== marker.id);

/**
 * Remove drink zone with the specified index from an animal marker
 *
 * @param marker Marker to update
 * @param index Target index to remove
 */
export const removeMarkerDrinkZone = (
  marker: MarkerOptionsAnimal,
  index: number,
): MarkerOptionsAnimal => ({
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
  marker: MarkerOptionsAnimal,
  index: number,
): MarkerOptionsAnimal => ({
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
  marker: MarkerOptionsAnimal,
  index: number,
): MarkerOptionsAnimal => ({
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
  markers: Array<MarkerOptionsAnimal>,
  marker: MarkerOptionsAnimal,
) => markers.map(m => (m.id === marker.id ? marker : m));
