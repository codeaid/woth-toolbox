import {
  animalDataPrefix,
  animalDataPrefixLegacy,
  customMarkerKey,
  mapTutorialKey,
  settingsKey,
} from 'config/storage';
import { base64Decode, base64Encode, isNotEmpty } from 'lib/utils';
import { Settings } from 'types/app';
import { MapType } from 'types/cartography';
import {
  MarkerDataAnimal,
  MarkerOptionsAnimal,
  MarkerOptionsCustom,
} from 'types/markers';

/**
 * Check if the specified storage is both supported and available
 * Source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
 *
 * @param {string} type Storage type to check
 */
const isStorageAvailable = (type: 'localStorage' | 'sessionStorage') => {
  // Ensure window object exists before proceeding
  if (typeof window === 'undefined') {
    return false;
  }

  const storage: Storage = window[type];

  try {
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // Everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // Test name field too, because code might not be present
        // Everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // Acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
    );
  }
};

/**
 * Get available storage container
 */
export const getStorage = () => {
  if (isStorageAvailable('localStorage')) {
    // Use local storage first and foremost
    return window.localStorage;
  } else if (isStorageAvailable('sessionStorage')) {
    // Fall back to session storage
    return window.sessionStorage;
  }

  throw new Error('No storage container available');
};

/**
 * Clear marker data from the storage
 *
 * @param storage Marker data storage
 * @param marker Marker object
 */
export const clearAnimalMarkerStore = (
  storage: Storage,
  marker: MarkerOptionsAnimal,
) => {
  // Generate marker and storage keys for the current marker
  const storageKey = getAnimalMarkerStoreKey(marker.id);

  // Remove item from the storage
  storage.removeItem(storageKey);
  return marker.id;
};

/**
 * Remove custom markers from the storage
 *
 * @param storage Target storage
 * @param map Target map type
 */
export const clearCustomMarkerStore = (storage: Storage, map: MapType) => {
  const storageKey = getCustomMarkerStoreKey(map);
  storage.removeItem(storageKey);
};

/**
 * Remove application settings from the storage
 *
 * @param storage Target storage
 */
export const clearSettingsStore = (storage: Storage) =>
  storage.removeItem(settingsKey);

/**
 * Get custom marker store key for the specified map
 *
 * @param id Target marker identifier
 */
const getAnimalMarkerStoreKey = (id: string) => `${animalDataPrefix}:${id}`;

/**
 * Get custom marker store key for the specified map
 *
 * @param map Target map type
 */
const getCustomMarkerStoreKey = (map: MapType) => `${customMarkerKey}:${map}`;

/**
 * Check if specified data object does not contain any values
 *
 * @param data Animal data object to validate
 */
export const isEmptyAnimalMarker = (data?: MarkerDataAnimal) =>
  !data ||
  ((!data.color || data.color === '#ffffff') &&
    (!data.comment || data.comment.trim() === '') &&
    (!data.group || !data.group.length));

/**
 * Check if map tutorial has previously been completed
 *
 * @param storage Target storage
 */
export const isMapTutorialCompleted = (storage: Storage) =>
  !!readMapTutorialCompleted(storage);

/**
 * Load all stored animal marker data entries
 *
 * @param storage Marker data storage
 * @param stripPrefixes TRUE to remove animal marker key prefixes
 */
export const readAnimalMarkerMap = (
  storage: Storage,
  stripPrefixes = true,
): Record<string, MarkerDataAnimal> =>
  [...Array(storage.length).keys()]
    // Read all available storage keys
    .map(i => storage.key(i))

    // Remove empty keys
    .filter(isNotEmpty)

    // Remove keys that are not related to animal markers
    .filter(key => key.startsWith(animalDataPrefix))

    // Convert all records read from the storage to a map
    .reduce((acc, key) => {
      // Ensure valid data exists in the storage
      const value = storage.getItem(key);
      if (!value) {
        return acc;
      }

      // Generate target key for the current record
      const recordKey = stripPrefixes
        ? key.substring(animalDataPrefix.length + 1)
        : key;

      try {
        // Attempt to parse data stored in the storage
        const record = JSON.parse(value);
        return { ...acc, [recordKey]: record };
      } catch (e) {
        return acc;
      }
    }, {});

/**
 * Retrieve marker data from the storage
 *
 * @param storage Marker data storage
 * @param marker Marker object
 */
export const readAnimalMarkerStore = (
  storage: Storage,
  marker: MarkerOptionsAnimal,
): Optional<MarkerDataAnimal> => {
  // Generate marker and storage keys for the current marker
  const storageKey = `${animalDataPrefix}:${marker.id}`;

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
 * Read custom marker data from the storage
 *
 * @param storage Target storage
 * @param map Source map type
 */
export const readCustomMarkerStore = (storage: Storage, map: MapType) => {
  try {
    // Read custom marker data from the storage
    const json = storage.getItem(getCustomMarkerStoreKey(map));
    if (!json) {
      return;
    }

    return JSON.parse(json) as Array<MarkerOptionsCustom>;
  } catch (e) {}
};

/**
 * Read tutorial completion status from the storage
 *
 * @param storage Target storage
 */
const readMapTutorialCompleted = (storage: Storage) => {
  try {
    const json = storage.getItem(mapTutorialKey);
    if (!json) {
      return;
    }

    return JSON.parse(json) as boolean;
  } catch (e) {}
};

/**
 * Serialize current storage contents for migration
 *
 * @param storage Source storage manager
 */
export const readSerializedStore = (storage: Storage) => {
  // Read data to serialize
  const animalMarkers = readAnimalMarkerMap(storage, false);

  // Read custom marker data
  const customMarkers = {
    [getCustomMarkerStoreKey('idaho')]: readCustomMarkerStore(storage, 'idaho'),
    [getCustomMarkerStoreKey('transylvania')]: readCustomMarkerStore(
      storage,
      'transylvania',
    ),
  };

  // Read other values
  const other = {
    [mapTutorialKey]: readMapTutorialCompleted(storage),
    [settingsKey]: readSettingsStore(storage),
  };

  // Serialize local storage data
  const json = JSON.stringify({
    ...animalMarkers,
    ...customMarkers,
    ...other,
  });

  // Base64 encode the output
  return base64Encode(json);
};

/**
 * Retrieve application settings from the storage
 *
 * @param storage Target storage
 */
export const readSettingsStore = (storage: Storage) => {
  try {
    // Read settings value from the storage
    const json = storage.getItem(settingsKey);
    if (!json) {
      return;
    }

    return JSON.parse(json) as Partial<Settings>;
  } catch (e) {}
};

/**
 * Remap animal marker keys from legacy format to the standardized format
 *
 * @param storage Target storage
 */
export const remapAnimalMarkerStore = (storage: Storage) =>
  [...Array(storage.length).keys()]
    // Read all available storage keys
    .map(i => storage.key(i))
    .filter(isNotEmpty)
    .filter(key => key.startsWith(animalDataPrefixLegacy))
    .forEach(key => {
      // Read marker data and ignore empty values
      const value = storage.getItem(key);
      if (!value) {
        return;
      }

      // Extract marker identifier and generate replacement key
      const id = key.substring(animalDataPrefixLegacy.length + 1);
      const nextKey = getAnimalMarkerStoreKey(id);

      // Move record to a new key
      storage.setItem(nextKey, value);
      storage.removeItem(key);
    });

/**
 * Store marker data in the storage
 *
 * @param storage Marker data storage
 * @param marker Marker object
 * @param data Marker data to store
 */
export const writeAnimalMarkerStore = (
  storage: Storage,
  marker: MarkerOptionsAnimal,
  data: MarkerDataAnimal,
) => {
  // Generate marker and storage keys for the current marker
  const storageKey = getAnimalMarkerStoreKey(marker.id);

  try {
    storage.setItem(storageKey, JSON.stringify(data));
    return marker.id;
  } catch (e) {}
};

/**
 * Persist custom markers to the storage
 *
 * @param storage Target storage
 * @param map Target map type
 * @param customMarkers List of markers to persist
 */
export const writeCustomMarkerStore = (
  storage: Storage,
  map: MapType,
  customMarkers: Array<MarkerOptionsCustom>,
) => {
  try {
    const json = JSON.stringify(customMarkers);
    storage.setItem(getCustomMarkerStoreKey(map), json);
  } catch (e) {}
};

/**
 * Deserialize encoded storage data string and update storage values
 *
 * @param storage Target storage manager
 * @param value Encoded storage data
 */
export const writeSerializedStore = (storage: Storage, value: string) => {
  // Trim value before processing
  value = value.trim();

  // Decode the base64 encoded string
  const json = base64Decode(value);

  // Attempt to parse decoded data
  const data = JSON.parse(json);

  // Iterate through all the entries in decoded data and store values in storage
  Object.entries(data as Record<string, unknown>).forEach(([key, value]) =>
    storage.setItem(key, JSON.stringify(value)),
  );
};

/**
 * Store application settings in the storage
 *
 * @param storage Target storage
 * @param settings Settings object to persist
 */
export const writeSettingsStore = (
  storage: Storage,
  settings: Partial<Settings>,
) => storage.setItem(settingsKey, JSON.stringify(settings));

/**
 * Mark map tutorial as completed
 *
 * @param storage Target storage
 */
export const writeMapTutorialCompleted = (storage: Storage) =>
  storage.setItem(mapTutorialKey, JSON.stringify(true));
