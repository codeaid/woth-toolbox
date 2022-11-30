import { getMarkerKey } from 'lib/markers';
import { AnimalMarkerData, AnimalMarkerOptions } from 'types/markers';

/**
 * Check if the specified storage is both supported and available
 * Source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
 *
 * @param {string} type Storage type to check
 */
const isStorageAvailable = (type: 'localStorage' | 'sessionStorage') => {
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
const getAnimalMarkerDataKey = (marker: AnimalMarkerOptions) => {
  const hash = getMarkerKey(marker);
  if (!hash) {
    return;
  }

  return `animal:${hash}`;
};

/**
 * Clear marker data from the storage
 *
 * @param storage Target storage
 * @param marker Marker object
 */
export const clearAnimalMarkerData = (
  storage: Storage,
  marker: AnimalMarkerOptions,
) => {
  const key = getAnimalMarkerDataKey(marker);
  if (!key) {
    return false;
  }

  storage.removeItem(key);
};

/**
 * Retrieve marker data from the storage
 *
 * @param storage Target storage
 * @param marker Marker object
 */
export const getAnimalMarkerData = (
  storage: Storage,
  marker: AnimalMarkerOptions,
): Optional<AnimalMarkerData> => {
  // Ensure a valid key can be created
  const key = getAnimalMarkerDataKey(marker);
  if (!key) {
    return;
  }

  // Attempt to read and parse data in the storage
  try {
    const json = storage.getItem(key);
    if (!json) {
      return;
    }

    return JSON.parse(json);
  } catch (e) {}
};

/**
 * Store marker data in the storage
 *
 * @param storage Target storage
 * @param marker Marker object
 * @param data Marker data to store
 */
export const setAnimalMarkerData = (
  storage: Storage,
  marker: AnimalMarkerOptions,
  data: AnimalMarkerData,
) => {
  // Ensure a valid key can be created
  const key = getAnimalMarkerDataKey(marker);
  if (!key) {
    return false;
  }

  try {
    storage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
};
