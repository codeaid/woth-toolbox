import { mapTypes } from 'config/cartography';
import {
  animalMarkerKey,
  customMarkerKey,
  mapTutorialKey,
  settingsKey,
} from 'config/storage';
import { base64Decode, base64Encode } from 'lib/utils';
import type { Settings } from 'types/app';
import type { MapType } from 'types/cartography';
import type { MarkerDataAnimal, MarkerOptionsCustom } from 'types/markers';

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
 * Clear the whole animal marker storage for the specified map
 *
 * @param storage Target storage
 * @param mapType Target map type
 */
const clearAnimalMarkerStorage = (storage: Storage, mapType: MapType) => {
  const storageKey = getAnimalMarkerStorageKey(mapType);
  storage.removeItem(storageKey);
};

/**
 * Clear marker data from the storage
 *
 * @param storage Target storage
 * @param mapType Target map type
 * @param markerId Marker identifier
 */
export const clearAnimalMarkerStorageItem = (
  storage: Storage,
  mapType: MapType,
  markerId: string,
) => {
  // Retrieve the current map of marker identifiers and their associated data
  const dataMap = readAnimalMarkerStorage(storage, mapType);

  // Remove data for the specified marker and persist changes to the storage
  dataMap.delete(markerId);
  writeAnimalMarkerStorage(storage, mapType, dataMap);
};

/**
 * Remove custom markers from the storage
 *
 * @param storage Target storage
 * @param mapType Target map type
 */
const clearCustomMarkerStorage = (storage: Storage, mapType: MapType) => {
  const storageKey = getCustomMarkerStorageKey(mapType);
  storage.removeItem(storageKey);
};

/**
 * Remove application settings from the storage
 *
 * @param storage Target storage
 */
export const clearSettingsStorage = (storage: Storage) =>
  storage.removeItem(settingsKey);

/**
 * Get animal marker storage key for the specified map
 *
 * @param mapType Target map type
 */
const getAnimalMarkerStorageKey = (mapType: MapType) =>
  `${animalMarkerKey}:${mapType}`;

/**
 * Get custom marker storage key for the specified map
 *
 * @param mapType Target map type
 */
const getCustomMarkerStorageKey = (mapType: MapType) =>
  `${customMarkerKey}:${mapType}`;

/**
 * Check if the specified marker data object does not contain any values
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
 * Read stored custom animal marker data for the specified map
 *
 * @param storage Target storage
 * @param mapType Source map type
 */
export const readAnimalMarkerStorage = (storage: Storage, mapType: MapType) => {
  // Generate storage key containing marker data of the specified map
  const storageKey = getAnimalMarkerStorageKey(mapType);
  const fallback = new Map<string, MarkerDataAnimal>();

  try {
    // Read map marker data from the storage
    const json = storage.getItem(storageKey);
    if (!json) {
      return fallback;
    }

    const obj = JSON.parse(json) as Record<string, MarkerDataAnimal>;
    return new Map<string, MarkerDataAnimal>(Object.entries(obj));
  } catch (e) {
    return fallback;
  }
};

/**
 * Retrieve marker data from the storage
 *
 * @param storage Marker data storage
 * @param mapType Parent map
 * @param markerId Marker identifier
 */
export const readAnimalMarkerStorageItem = (
  storage: Storage,
  mapType: MapType,
  markerId: string,
): Optional<MarkerDataAnimal> => {
  const dataMap = readAnimalMarkerStorage(storage, mapType);
  return dataMap?.get(markerId);
};

/**
 * Read custom markers from the storage
 *
 * @param storage Target storage
 * @param mapType Source map type
 */
export const readCustomMarkerStorage = (storage: Storage, mapType: MapType) => {
  try {
    // Read custom marker data from the storage
    const storageKey = getCustomMarkerStorageKey(mapType);
    const json = storage.getItem(storageKey);
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
  // Generate list of keys that should be migrated
  const keys = [
    ...mapTypes.map(getAnimalMarkerStorageKey),
    ...mapTypes.map(getCustomMarkerStorageKey),
    mapTutorialKey,
    settingsKey,
  ];

  try {
    // Fetch contents of each key and add it to the map
    const data = keys.reduce((acc, key) => {
      try {
        const json = storage.getItem(key);
        if (!json) {
          return acc;
        }

        const value = JSON.parse(json);
        if (!value) {
          return acc;
        }

        return acc.set(key, value);
      } catch (e) {
        return acc;
      }
    }, new Map());

    // Serialize local storage data
    const json = JSON.stringify(Object.fromEntries(data));
    return base64Encode(json);
  } catch (e) {
    return '';
  }
};

/**
 * Retrieve application settings from the storage
 *
 * @param storage Target storage
 */
export const readSettingsStorage = (storage: Storage) => {
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
 * Replace custom animal marker data in the storage
 *
 * @param storage Target storage
 * @param mapType Target map type
 * @param dataMap Map of marker identifiers and their associated data
 */
const writeAnimalMarkerStorage = (
  storage: Storage,
  mapType: MapType,
  dataMap: Map<string, MarkerDataAnimal>,
) => {
  // Delete the storage key if data map doesn't contain any values
  if (!dataMap.size) {
    clearAnimalMarkerStorage(storage, mapType);
    return true;
  }

  try {
    const json = JSON.stringify(Object.fromEntries(dataMap));

    const storageKey = getAnimalMarkerStorageKey(mapType);
    storage.setItem(storageKey, json);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Store marker data in the storage
 *
 * @param storage Marker data storage
 * @param mapType Parent map
 * @param markerId Marker identifier
 * @param data Marker data to store
 */
export const writeAnimalMarkerStorageItem = (
  storage: Storage,
  mapType: MapType,
  markerId: string,
  data: MarkerDataAnimal,
) => {
  // Retrieve the current map of marker identifiers and their associated data
  const dataMap = readAnimalMarkerStorage(storage, mapType);

  // Insert or update data for the specified marker
  dataMap.set(markerId, data);

  // Persist changes to the data map
  return writeAnimalMarkerStorage(storage, mapType, dataMap);
};

/**
 * Persist custom markers to the storage
 *
 * @param storage Target storage
 * @param mapType Target map type
 * @param customMarkers List of markers to persist
 */
export const writeCustomMarkerStorage = (
  storage: Storage,
  mapType: MapType,
  customMarkers: Array<MarkerOptionsCustom>,
) => {
  // Generate storage key for the custom marker storage
  const storageKey = getCustomMarkerStorageKey(mapType);

  // Remove the custom marker storage key
  if (!customMarkers.length) {
    clearCustomMarkerStorage(storage, mapType);
    return true;
  }

  try {
    const json = JSON.stringify(customMarkers);
    storage.setItem(storageKey, json);
  } catch (e) {}
};

/**
 * Deserialize encoded storage data string and update storage values
 *
 * @param storage Target storage manager
 * @param value Encoded storage data
 * @throws Errors are intentionally not caught to allow showing notifications
 */
export const writeSerializedStorage = (storage: Storage, value: string) => {
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
export const writeSettingsStorage = (
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
