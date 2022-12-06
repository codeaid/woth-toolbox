import { animalDataPrefix } from 'config/storage';
import { getMarkerKey } from 'lib/markers';
import { isNotEmpty } from 'lib/utils';
import { AnimalMarkerData, AnimalMarkerOptions } from 'types/markers';

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
 * Generate marker storage key
 *
 * @param marker Target marker to generate key for
 */
const getAnimalMarkerDataKey = (
  marker: AnimalMarkerOptions,
): [string, string] => {
  const markerKey = getMarkerKey(marker);

  return [markerKey, `${animalDataPrefix}${markerKey}`];
};

/**
 * Check if the specified value is an animal marker data key
 *
 * @param key Key to validate
 */
const isAnimalMarkerDataKey = (key: any): key is string =>
  key?.startsWith('animal:');

/**
 * Clear marker data from the storage
 *
 * @param storage Marker data storage
 * @param marker Marker object
 */
export const clearAnimalMarkerData = (
  storage: Storage,
  marker: AnimalMarkerOptions,
) => {
  // Generate marker and storage keys for the current marker
  const [markerKey, storageKey] = getAnimalMarkerDataKey(marker);

  // Remove item from the storage
  storage.removeItem(storageKey);
  return markerKey;
};

/**
 * Retrieve marker data from the storage
 *
 * @param storage Marker data storage
 * @param marker Marker object
 */
export const getAnimalMarkerData = (
  storage: Storage,
  marker: AnimalMarkerOptions,
): Optional<AnimalMarkerData> => {
  // Generate marker and storage keys for the current marker
  const [, storageKey] = getAnimalMarkerDataKey(marker);

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
 * Load all stored animal marker data entries
 *
 * @param storage Marker data storage
 */
export const getAnimalMarkerDataMap = (
  storage: Storage,
): Record<string, AnimalMarkerData> => {
  try {
    return (
      [...Array(storage.length).keys()]
        // Read all available storage keys
        .map(i => storage.key(i))
        // Remove keys that are not related to animal markers
        .filter(isAnimalMarkerDataKey)
        // Fetch actual animal marker data strings
        .map(key => [key, storage.getItem(key)] as [string, string])
        // Remove empty values
        .filter(([, json]) => isNotEmpty(json))
        // Convert JSON data values to data objects
        .map(
          ([key, json]) =>
            [key.substring(animalDataPrefix.length), JSON.parse(json!)] as [
              string,
              AnimalMarkerData,
            ],
        )
        .reduce(
          (acc, [key, data]) => ({
            ...acc,
            [key]: data,
          }),
          {},
        )
    );
  } catch (e) {
    return {};
  }
};

/**
 * Store marker data in the storage
 *
 * @param storage Marker data storage
 * @param marker Marker object
 * @param data Marker data to store
 */
export const setAnimalMarkerData = (
  storage: Storage,
  marker: AnimalMarkerOptions,
  data: AnimalMarkerData,
) => {
  // Generate marker and storage keys for the current marker
  const [markerKey, storageKey] = getAnimalMarkerDataKey(marker);

  try {
    storage.setItem(storageKey, JSON.stringify(data));
    return markerKey;
  } catch (e) {
    return;
  }
};
