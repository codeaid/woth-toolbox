import { explorationMarkerId } from 'config/markers';
import {
  animalMarkerKey,
  customMarkerKey,
  mapTutorialKey,
  settingsKey,
} from 'config/storage';
import { base64Decode, base64Encode } from 'lib/utils';
import type { MapId } from 'types/cartography';
import { mapIds } from 'types/cartography';
import type {
  AnimalMarkerRecord,
  CustomMarker,
  LocalStorageAnimalMarkerRecord,
} from 'types/markers';
import type {
  UserSettings,
  UserSettingsKey,
  UserSettingsTypeMap,
} from 'types/settings';

type LegacySettings = {
  animalMarkerRatings?: boolean;
  animalMarkerSize?: number;
  genericMarkerSize?: number;
  locale?: string;
  zoneMarkerSize?: number;
};

// Map of legacy keys and their current counterparts
const settingsLegacyKeyMap: Record<keyof LegacySettings, UserSettingsKey> = {
  animalMarkerRatings: 'marker:animal:ratings',
  animalMarkerSize: 'marker:animal:size',
  genericMarkerSize: 'marker:generic:size',
  locale: 'locale',
  zoneMarkerSize: 'marker:zone:size',
};

// Map of current keys and their legacy counterparts
export const settingsCurrentKeyMap: Record<
  UserSettingsKey,
  Optional<keyof LegacySettings>
> = {
  'marker:animal:ratings': 'animalMarkerRatings',
  'marker:animal:size': 'animalMarkerSize',
  'marker:generic:size': 'genericMarkerSize',
  'locale': 'locale',
  'marker:zone:size': 'zoneMarkerSize',
  'tutorial:completed': undefined,
};

/**
 * Get animal marker storage key for the specified map
 *
 * @param mapId Target map type
 */
const getAnimalMarkerStorageKey = (mapId: MapId) =>
  `${animalMarkerKey}:${mapId}`;

/**
 * Get custom marker storage key for the specified map
 *
 * @param mapId Target map type
 */
const getCustomMarkerStorageKey = (mapId: MapId) =>
  `${customMarkerKey}:${mapId}`;

/**
 * Check if the specified marker data object does not contain any values
 *
 * @param data Animal data object to validate
 */
export const isEmptyAnimalMarker = (data?: AnimalMarkerRecord) =>
  !data ||
  ((!data.color || data.color === '#ffffff') &&
    (!data.comment || data.comment.trim() === '') &&
    (!data.group || !data.group.length));

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
 * Read custom markers from the storage
 *
 * @param storage Target storage
 * @param mapId Source map type
 */
export const storageReadCustomMarkerListAsync = async (
  storage: Storage,
  mapId: MapId,
) => {
  // Read custom marker data from the storage
  const storageKey = getCustomMarkerStorageKey(mapId);
  const json = storage.getItem(storageKey);
  if (!json) {
    return [];
  }

  return (JSON.parse(json) as CustomMarker[]).map(marker =>
    marker.type === 'marker:exploration'
      ? { ...marker, id: explorationMarkerId }
      : marker,
  );
};

/**
 * Remove individual custom markers from the storage
 *
 * @param storage Target storage
 * @param mapId Target map type
 */
const storageClearCustomMarkerListAsync = async (
  storage: Storage,
  mapId: MapId,
) => {
  const storageKey = getCustomMarkerStorageKey(mapId);
  storage.removeItem(storageKey);
};

/**
 * Persist custom markers to the storage
 *
 * @param storage Target storage
 * @param mapId Target map type
 * @param customMarkers List of markers to persist
 */
export const storageWriteCustomMarkerListAsync = async (
  storage: Storage,
  mapId: MapId,
  customMarkers: CustomMarker[],
) => {
  // Generate storage key for the custom marker storage
  const storageKey = getCustomMarkerStorageKey(mapId);

  // Remove the custom marker storage key
  if (!customMarkers.length) {
    await storageClearCustomMarkerListAsync(storage, mapId);
    return;
  }

  const json = JSON.stringify(customMarkers);
  storage.setItem(storageKey, json);
};

/**
 * Retrieve animal marker data from the storage
 *
 * @param storage Marker data storage
 * @param mapId Parent map
 * @param markerId Marker identifier
 */
export const storageReadAnimalMarkerAsync = async (
  storage: Storage,
  mapId: MapId,
  markerId: string,
) => {
  const dataMap = await storageReadAnimalMarkerMapAsync(storage, mapId);
  return dataMap?.get(markerId);
};

/**
 * Read stored custom animal marker data for the specified map
 *
 * @param storage Target storage
 * @param mapId Source map type
 */
export const storageReadAnimalMarkerMapAsync = async (
  storage: Storage,
  mapId: MapId,
) => {
  // Generate storage key containing marker data of the specified map
  const storageKey = getAnimalMarkerStorageKey(mapId);

  // Read map marker data from the storage
  const json = storage.getItem(storageKey);
  if (!json) {
    return new Map<string, AnimalMarkerRecord>();
  }

  const contents = JSON.parse(json) as Record<
    string,
    LocalStorageAnimalMarkerRecord
  >;

  return new Map<string, AnimalMarkerRecord>(
    Object.entries(contents).map<[string, AnimalMarkerRecord]>(
      ([key, { created, updated, ...rest }]) => [
        key,
        {
          ...rest,
          id: key,
          createdAt: created ? new Date(created) : undefined,
          updatedAt: updated ? new Date(updated) : undefined,
        },
      ],
    ),
  );
};

/**
 * Store animal marker data in the storage
 *
 * @param storage Marker data storage
 * @param mapId Parent map
 * @param markerId Marker identifier
 * @param record Marker record to store
 */
export const storageUpdateAnimalMarkerAsync = async (
  storage: Storage,
  mapId: MapId,
  markerId: string,
  record: AnimalMarkerRecord,
) => {
  // Retrieve the current map of marker identifiers and their associated data
  const dataMap = await storageReadAnimalMarkerMapAsync(storage, mapId);

  // Remove empty data objects from Firebase
  if (isEmptyAnimalMarker(record)) {
    return storageDeleteAnimalMarkerAsync(storage, mapId, markerId);
  }

  // Insert or update data for the specified marker
  dataMap.set(markerId, record);
  await storageWriteAnimalMarkerMapAsync(storage, mapId, dataMap);
};

/**
 * Clear marker data from the storage
 *
 * @param storage Target storage
 * @param mapId Target map type
 * @param markerId Marker identifier
 */
export const storageDeleteAnimalMarkerAsync = async (
  storage: Storage,
  mapId: MapId,
  markerId: string,
) => {
  // Retrieve the current map of marker identifiers and their associated data
  const dataMap = await storageReadAnimalMarkerMapAsync(storage, mapId);

  // Remove data for the specified marker and persist changes to the storage
  dataMap.delete(markerId);
  await storageWriteAnimalMarkerMapAsync(storage, mapId, dataMap);
};

/**
 * Clear the whole animal marker storage for the specified map
 *
 * @param storage Target storage
 * @param mapId Target map type
 */
const storageClearAnimalMarkersAsync = async (
  storage: Storage,
  mapId: MapId,
) => {
  const storageKey = getAnimalMarkerStorageKey(mapId);
  storage.removeItem(storageKey);
};

/**
 * Replace custom animal marker data in the storage
 *
 * @param storage Target storage
 * @param mapId Target map type
 * @param dataMap Map of marker identifiers and their associated data
 */
const storageWriteAnimalMarkerMapAsync = async (
  storage: Storage,
  mapId: MapId,
  dataMap: Map<string, AnimalMarkerRecord>,
) => {
  // Delete the storage key if data map doesn't contain any values
  if (!dataMap.size) {
    return await storageClearAnimalMarkersAsync(storage, mapId);
  }

  const legacyEntries = [...dataMap.entries()].map<
    [string, LocalStorageAnimalMarkerRecord]
  >(([key, { createdAt, updatedAt, id, ...rest }]) => [
    key,
    {
      ...rest,
      created: createdAt?.getTime(),
      updated: updatedAt?.getTime(),
    },
  ]);

  const json = JSON.stringify(Object.fromEntries(legacyEntries));

  const storageKey = getAnimalMarkerStorageKey(mapId);
  storage.setItem(storageKey, json);
};

/**
 * Retrieve application settings from the storage
 *
 * @param storage Target storage
 */
export const storageReadSettingsListAsync = async (storage: Storage) => {
  const settings: UserSettings[] = [];

  // Read settings value from the storage
  const settingsJson = storage.getItem(settingsKey);
  if (settingsJson) {
    const contents = JSON.parse(settingsJson) as Partial<LegacySettings>;

    Object.entries(contents).forEach(([oldKey, value]) => {
      const newKey = settingsLegacyKeyMap[oldKey as keyof LegacySettings];
      settings.push({ key: newKey, value });
    });
  }

  const tutorial = storage.getItem(mapTutorialKey);
  if (!tutorial) {
    return settings;
  }

  return settings.concat({ key: 'tutorial:completed', value: true });
};

/**
 * Store application settings in the storage
 *
 * @param storage Target storage
 * @param key Configuration entry key
 * @param value Configuration entry value
 */
export const storageUpdateSettingsValueAsync = async <
  TKey extends UserSettingsKey,
>(
  storage: Storage,
  key: TKey,
  value: UserSettingsTypeMap[TKey],
) => {
  if (key === 'tutorial:completed') {
    storage.setItem(mapTutorialKey, JSON.stringify(true));
    return;
  }

  const settings = await storageReadSettingsListAsync(storage);
  const replacement = settings
    .filter(item => item.key !== key)
    .concat({ key, value });

  await storageWriteSettingsAsync(storage, replacement);
};

/**
 * Delete a settings entry from the storage
 *
 * @param storage Target storage
 * @param key Configuration entry key
 */
export const storageDeleteSettingsValueAsync = async (
  storage: Storage,
  key: UserSettingsKey,
) => {
  const settings = await storageReadSettingsListAsync(storage);
  const replacement = settings.filter(entry => entry.key !== key);

  if (!replacement.length) {
    await storageClearSettingsAsync(storage);
    return;
  }

  return await storageWriteSettingsAsync(storage, replacement);
};

/**
 * Persist a list of settings to the local storage
 *
 * @param storage Target storage
 * @param settings List of settings to persist
 */
const storageWriteSettingsAsync = async (
  storage: Storage,
  settings: UserSettings[],
) => {
  const legacyMap = settings.reduce<LegacySettings>((acc, current) => {
    const legacyKey = settingsCurrentKeyMap[current.key];
    if (!legacyKey) {
      return acc;
    }

    return { ...acc, [legacyKey]: current.value };
  }, {} as LegacySettings);

  storage.setItem(settingsKey, JSON.stringify(legacyMap));
};

/**
 * Remove application settings from the storage
 *
 * @param storage Target storage
 */
export const storageClearSettingsAsync = async (storage: Storage) =>
  storage.removeItem(settingsKey);

/**
 * Read tutorial completion status from the storage
 *
 * @param storage Target storage
 */
export const storageReadTutorialFlagAsync = async (storage: Storage) => {
  const json = storage.getItem(mapTutorialKey);
  if (!json) {
    return false;
  }

  return JSON.parse(json) as boolean;
};

/**
 * Mark map tutorial as completed
 *
 * @param storage Target storage
 */
export const storageWriteTutorialFlagAsync = async (storage: Storage) =>
  storage.setItem(mapTutorialKey, JSON.stringify(true));

/**
 * Serialize current storage contents for migration
 *
 * @param storage Source storage manager
 */
export const storageSerializeAsync = async (storage: Storage) => {
  // Generate list of keys that should be migrated
  const keys = [
    ...mapIds.map(getAnimalMarkerStorageKey),
    ...mapIds.map(getCustomMarkerStorageKey),
    mapTutorialKey,
    settingsKey,
  ];

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
};

/**
 * Deserialize encoded storage data string and update storage values
 *
 * @param storage Target storage manager
 * @param value Encoded storage data
 * @throws Errors are intentionally not caught to allow showing notifications
 */
export const storageUnserializeAsync = async (
  storage: Storage,
  value: string,
) => {
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
