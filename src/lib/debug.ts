import { getCoordinateHash } from 'lib/markers';
import { getMarkerMigrationPartitions } from 'lib/migration';
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
 * Build a merged list of matched and unmatched Toolbox and THQ markers
 *
 * @param tbxMarkers Original Toolbox markers
 * @param thqMarkers THQ markers
 * @param logPartitions TRUE to log generated partitions to the console
 * @param logMigrationMap TRUE to log migration map entries to the console
 */
export const getMigrationDebugMarkers = (
  tbxMarkers: Array<MarkerOptionsAnimal>,
  thqMarkers: Array<MarkerOptionsAnimal>,
  logPartitions = false,
  logMigrationMap = false,
) => {
  // Get Toolbox and THQ markers split into matched and unmatched
  const {
    matchedResults,
    matchedSource,
    matchedTarget,
    unmatchedSource,
    unmatchedTarget,
  } = getMarkerMigrationPartitions(tbxMarkers, thqMarkers, 0.001, 0.02, 0.001);

  // Log migration results to console
  if (logPartitions) {
    console.info({
      matchedResults,
      matchedSource,
      matchedTarget,
      unmatchedSource,
      unmatchedTarget,
    });
  }

  // Log entries of old to new identifier map
  if (logMigrationMap) {
    matchedResults.forEach(result => {
      const { marker, matches } = result;
      const [match] = matches;

      setTimeout(
        console.log.bind(console, JSON.stringify([marker.id, match.id]) + ','),
      );
    });
  }

  // Generate a list of matched Toolbox markers
  const tbxMarkersMatched = [
    ...matchedSource.values(),
  ].map<MarkerOptionsAnimal>(marker => ({
    ...marker,
    meta: { tbx: true, matched: true },
  }));

  // Generate a list of unmatched Toolbox markers
  const tbxMarkersUnmatched = [
    ...unmatchedSource.values(),
  ].map<MarkerOptionsAnimal>(marker => ({
    ...marker,
    meta: { tbx: true, matched: false },
  }));

  // Generate a list of matched THQ markers
  const thqMarkersMatched = [
    ...matchedTarget.values(),
  ].map<MarkerOptionsAnimal>(marker => ({
    ...marker,
    meta: { thq: true, matched: true },
  }));

  // Generate a list of unmatched THQ markers
  const thqMarkersUnmatched = [
    ...unmatchedTarget.values(),
  ].map<MarkerOptionsAnimal>(marker => ({
    ...marker,
    meta: { thq: true, matched: false },
  }));

  // Merge all markers together
  return [
    ...tbxMarkersMatched,
    ...tbxMarkersUnmatched,
    ...thqMarkersMatched,
    ...thqMarkersUnmatched,
  ];
};

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
