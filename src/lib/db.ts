import { createUserId } from 'lib/persistence';

const indexedDbName = 'WayOfTheHunterToolbox';
const indexedDbStoreConfig = 'Config';

/**
 * Initialise the IndexedDB database instance
 */
export const createDatabaseAsync = () =>
  new Promise<IDBDatabase>((resolve, reject) => {
    // Ensure IndexedDB is available before proceeding
    if (
      typeof window === 'undefined' ||
      typeof window.indexedDB === 'undefined'
    ) {
      throw new Error('IndexedDB is not available');
    }

    // Create a request to open the database
    const request = window.indexedDB.open(indexedDbName);

    // Listen for successful connections
    request.addEventListener('success', event => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    });

    // Listen for errors while opening the connection
    request.addEventListener('error', event => {
      console.error('Opening connection to IndexedDB failed');
      reject(event);
    });

    // Database needs initialisation or upgrading
    request.addEventListener('upgradeneeded', event => {
      // Access the database instance and upgrade transaction object
      const db = (event.target as IDBOpenDBRequest).result;

      // Handle errors during database initialisations
      db.addEventListener('error', event => {
        console.error('Error creating IndexedDB database');
        reject(event);
      });

      // Initialise stores
      createConfigStore(db);
    });
  });

/**
 * Create the config store
 *
 * @param db Source IndexedDB database
 */
const createConfigStore = (db: IDBDatabase) => {
  // Initialise configuration store
  const store = db.createObjectStore(indexedDbStoreConfig, {
    autoIncrement: false,
    keyPath: 'key',
  });

  // Insert default records
  store.add({ key: 'uid', value: createUserId() });
  store.add({ key: 'migrated', value: null });
};

/**
 * Read value of the specified configuration record
 *
 * @param db Database instance
 * @param key Identifier of the record to read
 */
export const getConfigValueAsync = <T>(db: IDBDatabase, key: string) =>
  new Promise<Optional<T>>((resolve, reject) => {
    // Initialize a request for the animal marker record
    const transaction = db.transaction(indexedDbStoreConfig, 'readonly');
    const request = transaction
      .objectStore(indexedDbStoreConfig)
      .get(key) as IDBRequest<{ key: string; value: T }>;

    // Remove the legacy local storage key upon successful import
    transaction.addEventListener('complete', () => {
      resolve(request.result?.value);
    });

    // Handle error during the import and keep the legacy local storage key intact
    transaction.addEventListener('error', event => {
      console.error('Error reading configuration value from IndexedDB', event);
      reject(event);
    });
  });

/**
 * Update or create a configuration entry value
 *
 * @param db Database instance
 * @param key Configuration entry key
 * @param value Configuration entry value
 */
export const setConfigValueAsync = <T>(
  db: IDBDatabase,
  key: string,
  value: T,
) => {
  return new Promise<T>(async (resolve, reject) => {
    // Initialize a request for a write operation
    const transaction = db.transaction(indexedDbStoreConfig, 'readwrite');

    // Listen for successful and failed transaction completions
    transaction.addEventListener('complete', () => resolve(value));
    transaction.addEventListener('error', event => {
      console.error('Error updating configuration value in IndexedDB', event);
      reject(event);
    });

    // Update the entity
    transaction.objectStore(indexedDbStoreConfig).put({ key, value });
  });
};
