import { markerMigrationMap } from 'config/migration';
import { animalMarkerKeyLegacy } from 'config/storage';
import { writeAnimalMarkerStorageItem } from 'lib/storage';
import { base64Encode, isNotEmpty, roundNumber } from 'lib/utils';
import { AnimalType } from 'types/animals';
import { MapType } from 'types/cartography';
import { MarkerDataAnimal, MarkerOptionsAnimal } from 'types/markers';
import {
  MarkerDistanceResult,
  MarkerMatchResult,
  MigrationResult,
} from 'types/migration';
import { sendGoogleEvent } from 'lib/tracking';

/**
 * Function used to sort markers by their type and identifier
 *
 * @param a The first element for comparison
 * @param b The second element for comparison
 */
const compareMarkersByType = (
  a: MarkerOptionsAnimal,
  b: MarkerOptionsAnimal,
) => {
  const result = a.type.localeCompare(b.type);
  return result !== 0 ? result : a.id.localeCompare(b.id);
};

/**
 * Filter a list of markers to only contain those of matching type
 *
 * @param markers Source list of markers to filter
 * @param type Target marker type to preserve
 */
const filterMarkersByType = (
  markers: Array<MarkerOptionsAnimal>,
  type: AnimalType,
) => markers.filter(marker => marker.type === type);

/**
 * Retrieve marker data from the storage
 *
 * @param storage Marker data storage
 * @param storageKey Target storage key
 */
const getLegacyMarkerStorageItem = (
  storage: Storage,
  storageKey: string,
): Optional<MarkerDataAnimal> => {
  // Attempt to read and parse data in the storage
  try {
    const json = storage.getItem(storageKey);
    if (!json) {
      return;
    }

    return JSON.parse(json);
  } catch (e) {}
};

/**
 * Extract legacy marker identifier from a marker storage key
 *
 * @param storageKey Target key to process
 */
const getLegacyMarkerStorageItemId = (storageKey: string) =>
  storageKey.substring(animalMarkerKeyLegacy.length);

/**
 * Get list of legacy animal marker storage keys currently found in the storage
 *
 * @param storage Target storage
 */
const getLegacyMarkerStorageKeys = (storage: Storage) =>
  [...Array(storage.length).keys()]
    .map(i => storage.key(i))
    .filter(isNotEmpty)
    .filter(isLegacyMarkerStorageKey);

/**
 * Generate a map of animal marker storage keys and marker ids they represent
 *
 * @param storage Target storage
 */
const getLegacyMarkerStorageKeyMap = (storage: Storage) =>
  getLegacyMarkerStorageKeys(storage).reduce(
    (acc, storageKey) =>
      acc.set(getLegacyMarkerStorageItemId(storageKey), storageKey),
    new Map<string, string>(),
  );

/**
 * Get distance between two marker coordinate points on a coordinate plane
 *
 * @param source Left operand
 * @param target Right operand
 */
const getMarkerDistance = (
  source: MarkerOptionsAnimal,
  target: MarkerOptionsAnimal,
) => {
  const [x1, y1] = source.coords;
  const [x2, y2] = target.coords;

  // d=√((x2 – x1)² + (y2 – y1)²
  const dx = Math.abs(x1 - x2);
  const dy = Math.abs(y1 - y2);
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Get distance between two markers and return an object including the target
 *
 * @param source Left operand
 * @param target Right operand
 */
const getMarkerDistanceResult = (
  source: MarkerOptionsAnimal,
  target: MarkerOptionsAnimal,
): MarkerDistanceResult => ({
  distance: getMarkerDistance(source, target),
  target,
});

/**
 * Get a list of marker match results consisting of the source marker and all
 * target markers of the same animal species that are withing the specified
 * distance threshold
 *
 * @param sourceMarkers List of source (original) markers
 * @param targetMarkers List of target markers
 * @param maxDistance Maximum distance between the source and target markers
 */
const getMarkerMatchResults = (
  sourceMarkers: Array<MarkerOptionsAnimal>,
  targetMarkers: Array<MarkerOptionsAnimal>,
  maxDistance: number,
) =>
  sourceMarkers.map<MarkerMatchResult>(marker => {
    // Retrieve target markers matching the source type
    const targetSpeciesMarkers = filterMarkersByType(
      targetMarkers,
      marker.type,
    );

    // Find target markers that are within the threshold distance
    const matches = targetSpeciesMarkers
      .map(targetMarker => getMarkerDistanceResult(marker, targetMarker))
      .filter(result => result.distance <= maxDistance)
      .map(result => result.target);

    return {
      marker,
      matches,
    };
  });

/**
 * Filter marker migration Map to only contain source and target marker
 * identifier pairs matching the specified source marker identifiers
 *
 * @param legacyIds List of source marker identifiers
 */
const getMarkerMigrationMap = (legacyIds: Array<string>) =>
  [...markerMigrationMap].reduce((acc, [mapType, markerMap]) => {
    // Filter map-specific Map of source->target marker identifiers
    const replacements = new Map(
      [...markerMap].filter(([legacyId]) => legacyIds.includes(legacyId)),
    );

    // Set map's identifier Map if it contains any of the legacy entries
    return replacements.size > 0 ? acc.set(mapType, replacements) : acc;
  }, new Map<MapType, Map<string, string>>());

/**
 * Perform multiple iterations through the source markers and find the nearest
 *
 * @param sourceMarkers
 * @param targetMarkers
 * @param maxDistanceStart
 * @param maxDistanceIncrement
 * @param maxDistanceEnd
 */
export const getMarkerMigrationPartitions = (
  sourceMarkers: Array<MarkerOptionsAnimal>,
  targetMarkers: Array<MarkerOptionsAnimal>,
  maxDistanceStart: number,
  maxDistanceEnd: number,
  maxDistanceIncrement: number,
) => {
  // Lists of markers yet to be processed (reduced with each iteration)
  let sourceQueue = [...sourceMarkers];
  let targetPool = [...targetMarkers];

  // Lists or successful matches to be returned
  let matchedResults: Array<MarkerMatchResult> = [];

  // Starting maximum distance (incremented with each iteration)
  let maxDistance = maxDistanceStart;

  // Iterate through every source marker and find all target markers that are
  // within the allowed maximum distance. Remove matched markers from the
  // queue/pool to speed up the subsequent runs.
  while (maxDistance <= maxDistanceEnd) {
    // Retrieve target marker matches that are within the threshold distance
    const matchResults = getMarkerMatchResults(
      sourceQueue,
      targetPool,
      maxDistance,
    );

    // Find results that have only one match and add them to the output
    const matches = matchResults.filter(n => n.matches.length === 1);
    matchedResults = matchedResults.concat(matches);

    // Extract source markers that have either no matches or have more than one
    // match and replace the source queue with them
    sourceQueue = matchResults
      .filter(n => n.matches.length !== 1)
      .map(partition => partition.marker);

    // Retrieve identifiers of target markers that have been matched
    const matchedTargetIds = matches
      .map(result => result.matches)
      .flat()
      .map(target => target.id);

    // Remove target markers that have just been matched to their source marker
    // counterparts from that target pool to speed up the subsequent run
    targetPool = targetPool.filter(
      target => !matchedTargetIds.includes(target.id),
    );

    // Increment the current maximum distance by the specified amount
    maxDistance = roundNumber(maxDistance + Math.abs(maxDistanceIncrement), 3);
  }

  // Return an object contain the following partitions:
  //  - Results with source markers that are only matched to one target marker
  //  - Map of matched source marker identifiers and their marker options
  //  - Map of matched target marker identifiers and their marker options
  //  - Map of unmatched source marker identifiers and their marker options
  //  - Map of unmatched target marker identifiers and their marker options
  return {
    matchedResults,
    matchedSource: getMarkerOptionMap(
      matchedResults.map(result => result.marker),
    ),
    matchedTarget: getMarkerOptionMap(
      matchedResults.map(result => result.matches).flat(),
    ),
    unmatchedSource: getMarkerOptionMap(sourceQueue),
    unmatchedTarget: getMarkerOptionMap(targetPool),
  };
};

/**
 * Convert a list of marker options to a map with marker identifiers as keys
 * and marker options as their values
 *
 * @param markers List of markers to convert
 */
const getMarkerOptionMap = (markers: Array<MarkerOptionsAnimal>) =>
  markers
    .sort(compareMarkersByType)
    .reduce(
      (acc, curr) => acc.set(curr.id, curr),
      new Map<string, MarkerOptionsAnimal>(),
    );

/**
 * Check if the specified storage key represents an animal marker
 *
 * @param key Target storage key to validate
 */
const isLegacyMarkerStorageKey = (key: string) =>
  key.startsWith(animalMarkerKeyLegacy);

/**
 *
 * @param storage
 */
export const migrateLegacyMarkers = (storage: Storage): MigrationResult => {
  // Get map of legacy marker ids and their associated storage keys
  const legacyMarkerStorageKeyMap = getLegacyMarkerStorageKeyMap(storage);
  const legacyIds = [...legacyMarkerStorageKeyMap.keys()];

  // Get a map of all available in-game map types and their associated
  // legacy->new marker identifier mappings
  const migrationMarkerMap = getMarkerMigrationMap(legacyIds);

  // List of processed animal marker identifiers to return from the function
  const migrated: Record<string, MarkerDataAnimal> = {};

  // Iterate through every map that has any markers to migrate
  migrationMarkerMap.forEach((markerMap, mapType) => {
    // Generate the storage key
    const legacyMarkerIds = [...markerMap.keys()];

    legacyMarkerIds.forEach(legacyMarkerId => {
      // Find legacy marker storage key associated with the
      const legacyStorageKey = legacyMarkerStorageKeyMap.get(legacyMarkerId);
      if (!legacyStorageKey) {
        return;
      }

      // Read legacy marker object from the local storage
      const legacyMarkerStorageValue = getLegacyMarkerStorageItem(
        storage,
        legacyStorageKey,
      );

      if (!legacyMarkerStorageValue) {
        return;
      }

      // Find the new (replacement) identifier associated with the legacy one
      const markerId = markerMap.get(legacyMarkerId);
      if (!markerId) {
        return;
      }

      // Update new animal marker key in the local storage to contain the data
      const success = writeAnimalMarkerStorageItem(
        storage,
        mapType,
        markerId,
        legacyMarkerStorageValue,
      );

      // Remove the legacy marker storage item if addition was successful
      if (success) {
        // Remove item from the storage
        storage.removeItem(legacyStorageKey);
        migrated[legacyStorageKey] = legacyMarkerStorageValue;
      }
    });
  });

  // Notify Google Analytics
  const count = Object.keys(migrated).length;
  sendGoogleEvent('migration_success', { count });

  return {
    code: base64Encode(JSON.stringify(migrated)),
    count,
  };
};
