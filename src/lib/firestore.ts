import { signInAnonymously } from 'firebase/auth';
import type {
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
} from 'firebase/firestore';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { explorationMarkerId } from 'config/markers';
import { getConfigValueAsync, setConfigValueAsync } from 'lib/db';
import { isEmptyAnimalMarker } from 'lib/markers';
import { validateUserId } from 'lib/persistence';
import { firebaseAuth, firestore } from 'lib/services';
import {
  storageReadAnimalMarkerMapAsync,
  storageReadCustomMarkerListAsync,
  storageReadSettingsListAsync,
} from 'lib/storage';
import type { MapId } from 'types/cartography';
import { mapIds } from 'types/cartography';
import type {
  AnimalMarkerDocument,
  CustomMarkerDocument,
  UserSettingsDocument,
} from 'types/firestore';
import type { AnimalMarkerRecord, CustomMarker } from 'types/markers';
import type { UserSettingsKey, UserSettingsTypeMap } from 'types/settings';
import { userSettingsKeysPermanent } from 'types/settings';

/**
 * Create a reference to the current user's animal marker collection for the specified map
 *
 * @param userId Owner identifier
 * @param mapId Target map identifier
 */
export const firestoreCreateAnimalMarkerListRef = (
  userId: string,
  mapId: MapId,
) =>
  collection(
    firestore,
    'users',
    userId,
    `markers:${mapId}:animals`,
  ) as CollectionReference<AnimalMarkerDocument, AnimalMarkerDocument>;

/**
 * Create a reference to the current user's animal marker document for the specified map
 *
 * @param userId Owner identifier
 * @param mapId Target map identifier
 * @param recordId Marker record identifier
 */
const firestoreCreateAnimalMarkerRef = (
  userId: string,
  mapId: MapId,
  recordId: string,
) =>
  doc(
    firestore,
    'users',
    userId,
    `markers:${mapId}:animals`,
    recordId,
  ) as DocumentReference<AnimalMarkerRecord, AnimalMarkerRecord>;

/**
 * Create a reference to the current user's custom marker document for the specified map
 *
 * @param userId Owner identifier
 * @param mapId Target map identifier
 */
export const firestoreCreateCustomMarkerRef = (userId: string, mapId: MapId) =>
  doc(firestore, 'users', userId, `markers:custom`, mapId) as DocumentReference<
    CustomMarkerDocument,
    CustomMarkerDocument
  >;

/**
 * Create a reference to the current user's settings collection
 *
 * @param userId Owner identifier
 */
export const firestoreCreateSettingsRef = (userId: string) =>
  collection(firestore, 'users', userId, 'settings') as CollectionReference<
    UserSettingsDocument,
    UserSettingsDocument
  >;

/**
 * Create a reference to the current user's settings collection
 *
 * @param userId Owner identifier
 * @param key Settings entry key
 */
const firestoreCreateSettingsItemRef = <TKey extends UserSettingsKey>(
  userId: string,
  key: TKey,
) =>
  doc(firestore, 'users', userId, 'settings', key) as DocumentReference<
    UserSettingsDocument,
    UserSettingsDocument
  >;

/**
 * Initialise Firestore for use with the application
 *
 * @param db Database instance
 * @param storage Storage to use during migration
 */
export const firestoreInitialiseAsync = async (
  db: IDBDatabase,
  storage: Storage,
) => {
  // Ensure a valid user identifier exists in IndexedDB
  const userId = await getConfigValueAsync<string>(db, 'uid');
  if (!validateUserId(userId)) {
    throw new Error('Invalid user identifier encountered');
  }

  // Sign current user into firestore
  await signInAnonymously(firebaseAuth);

  // Perform migration if needed
  await firestoreMigrateAsync(db, storage, userId);

  return userId;
};

/**
 * Perform local store migration
 *
 * @param db Database instance
 * @param storage Storage to use during migration
 * @param userId Firestore user identifier
 */
export const firestoreMigrateAsync = async (
  db: IDBDatabase,
  storage: Storage,
  userId: string,
) => {
  const migrated = await getConfigValueAsync<Date>(db, 'migrated');

  if (!migrated) {
    await firestoreMigrateSettingsAsync(storage, userId);
    await firestoreMigrateAnimalMarkersAsync(storage, userId);
    await firestoreMigrateCustomMarkersAsync(storage, userId);
    await setConfigValueAsync(db, 'migrated', new Date());
  }
};

/**
 * Migrate legacy local storage marker data to Firestore
 *
 * @param storage Source marker storage
 * @param userId Target user identifier
 */
const firestoreMigrateAnimalMarkersAsync = async (
  storage: Storage,
  userId: string,
) => {
  // Iterate through all the map keys and migrate their contents to Firestore
  for (const mapId of mapIds) {
    // Populate store with data from local storage
    const markers = await storageReadAnimalMarkerMapAsync(storage, mapId);

    // Nothing to import
    if (markers.size === 0) {
      continue;
    }

    // Create a new write batch
    const batch = writeBatch(firestore);

    for (const record of [...markers.values()]) {
      // Generate path to the target document and add the record to the batch
      const markerRef = firestoreCreateAnimalMarkerRef(
        userId,
        mapId,
        record.id,
      );
      batch.set(markerRef, record);
    }

    // Commit the batch
    await batch.commit();
  }
};

/**
 * Migrate legacy local storage custom marker data to Firestore
 *
 * @param storage Source marker storage
 * @param userId Target user identifier
 */
const firestoreMigrateCustomMarkersAsync = async (
  storage: Storage,
  userId: string,
) => {
  // Iterate through all the map keys and migrate their contents to Firestore
  for (const mapId of mapIds) {
    // Populate store with data from local storage
    const markers = await storageReadCustomMarkerListAsync(storage, mapId);

    // Nothing to import
    if (markers.length === 0) {
      continue;
    }

    const document = markers.reduce<CustomMarkerDocument>(
      (acc, marker) => ({ ...acc, [marker.id]: marker.coords }),
      {} as CustomMarkerDocument,
    );

    const docRef = firestoreCreateCustomMarkerRef(userId, mapId);
    await setDoc(docRef, document);
  }
};

/**
 * Migrate settings from local storage into Firestore
 *
 * @param storage Source settings storage
 * @param userId Target user identifier
 */
const firestoreMigrateSettingsAsync = async (
  storage: Storage,
  userId: string,
) => {
  // Read settings currently stored in local storage
  const settings = await storageReadSettingsListAsync(storage);
  if (!settings || !settings.length) {
    return;
  }

  console.info('Importing local storage settings');

  // Create a new write batch
  const batch = writeBatch(firestore);

  for (const entry of settings) {
    const itemRef = firestoreCreateSettingsItemRef(userId, entry.key);
    batch.set(itemRef, entry);
  }

  // Commit the batch
  await batch.commit();
};

/**
 * Create custom marker
 *
 * @param userId Current user identifier
 * @param mapId Target map identifier
 * @param marker Marker to create
 */
export const firestoreCreateCustomMarkerAsync = async (
  userId: string,
  mapId: MapId,
  marker: CustomMarker,
) => {
  const docRef = firestoreCreateCustomMarkerRef(userId, mapId);
  const snapshot = await getDoc(docRef);
  const data = snapshot.data() ?? {};

  await setDoc(docRef, { ...data, [marker.id]: marker.coords });
};

/**
 * Delete custom marker
 *
 * @param userId Current user identifier
 * @param mapId Target map identifier
 * @param id Marker identifier
 */
export const firestoreDeleteCustomMarkerAsync = async (
  userId: string,
  mapId: MapId,
  id: string,
) => {
  const docRef = firestoreCreateCustomMarkerRef(userId, mapId);
  const snapshot = await getDoc(docRef);
  const data = snapshot.data() ?? {};

  const { [id]: _, ...replacement } = data;

  if (!Object.keys(replacement).length) {
    await deleteDoc(docRef);
    return;
  }

  await setDoc(docRef, replacement);
};

/**
 * Clear all tracking markers
 *
 * @param userId Current user identifier
 * @param mapId Target map identifier
 */
export const firestoreClearTrackingMarkersAsync = async (
  userId: string,
  mapId: MapId,
) => {
  const docRef = firestoreCreateCustomMarkerRef(userId, mapId);
  const snapshot = await getDoc(docRef);
  const data = snapshot.data() ?? {};

  if (explorationMarkerId in data) {
    await setDoc(docRef, { [explorationMarkerId]: data.exploration });
  } else {
    await deleteDoc(docRef);
  }
};

/**
 * Update an individual animal marker record
 *
 * @param userId Owner identifier
 * @param mapId Target map identifier
 * @param record Record data to persist
 */
export const firestoreUpdateAnimalMarkerAsync = async (
  userId: string,
  mapId: MapId,
  record: AnimalMarkerRecord,
) => {
  // Remove empty data objects from Firebase
  if (isEmptyAnimalMarker(record)) {
    return firestoreDeleteAnimalMarkerAsync(userId, mapId, record);
  }

  // Generate path to the target document
  const markerRef = firestoreCreateAnimalMarkerRef(userId, mapId, record.id);
  await setDoc(markerRef, record);
};

/**
 * Delete an animal marker record
 *
 * @param userId Owner identifier
 * @param mapId Target map identifier
 * @param record Record to delete
 */
export const firestoreDeleteAnimalMarkerAsync = async (
  userId: string,
  mapId: MapId,
  record: AnimalMarkerRecord,
) => {
  // Generate path to the target document
  const markerRef = firestoreCreateAnimalMarkerRef(userId, mapId, record.id);
  await deleteDoc(markerRef);
};

/**
 * Read a configuration entry value
 *
 * @param userId Owner identifier
 * @param key Configuration entry key
 */
export const firestoreReadSettingsValueAsync = async <
  TKey extends UserSettingsKey,
>(
  userId: string,
  key: TKey,
) => {
  const settingsRef = firestoreCreateSettingsItemRef<TKey>(userId, key);

  const snapshot = (await getDoc(settingsRef)) as DocumentSnapshot<
    UserSettingsDocument<TKey>,
    UserSettingsDocument<TKey>
  >;
  return snapshot.data();
};

/**
 * Update or create a configuration entry value
 *
 * @param userId Owner identifier
 * @param key Configuration entry key
 * @param value Configuration entry value
 */
export const firestoreUpdateSettingsValueAsync = async <
  TKey extends UserSettingsKey,
>(
  userId: string,
  key: TKey,
  value: UserSettingsTypeMap[TKey],
) => {
  const settingsRef = firestoreCreateSettingsItemRef<TKey>(userId, key);
  await setDoc(settingsRef, {
    key,
    value,
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  });
};

/**
 * Delete a configuration entry value
 *
 * @param userId Owner identifier
 * @param key Configuration entry key
 */
export const firestoreDeleteSettingsValueAsync = async (
  userId: string,
  key: UserSettingsKey,
) => {
  const settingsRef = firestoreCreateSettingsItemRef(userId, key);
  await deleteDoc(settingsRef);
};

/**
 * Delete all configuration values
 *
 * @param userId Owner identifier
 */
export const firestoreClearSettingsAsync = async (userId: string) => {
  const settingsRef = firestoreCreateSettingsRef(userId);

  // Create a new write batch
  const batch = writeBatch(firestore);

  const snapshot = await getDocs(settingsRef);
  for (const doc of snapshot.docs) {
    const data = doc.data();
    if ((userSettingsKeysPermanent as readonly string[]).includes(data.key)) {
      continue;
    }

    // Mark settings entry for deletion
    batch.delete(doc.ref);
  }

  // Commit the batch
  await batch.commit();
};
