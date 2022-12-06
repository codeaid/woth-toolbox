import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  clearAnimalMarkerData,
  getAnimalMarkerData,
  getAnimalMarkerDataMap,
  getStorage,
  setAnimalMarkerData,
} from 'lib/storage';
import { AnimalMarkerData, AnimalMarkerOptions } from 'types/markers';

/**
 * Animal marker data management helper hook
 */
export const useAnimalMarkerData = () => {
  const [storage, setStorage] = useState<Storage>();

  // Animal marker data
  const [dataMap, setDataMap] = useState<Record<string, AnimalMarkerData>>({});

  /**
   * Handle clearing animal data from the storage
   */
  const handleDataClear = useCallback(
    (marker: AnimalMarkerOptions) => {
      // Ensure storage is present before continuing
      if (!storage) {
        return;
      }

      const markerKey = clearAnimalMarkerData(storage, marker);
      setDataMap(current =>
        Object.fromEntries(
          Object.entries(current).filter(([key]) => key !== markerKey),
        ),
      );
    },
    [storage],
  );

  /**
   * Handle reading animal data from the storage
   */
  const handleDataRead = useCallback(
    (marker: AnimalMarkerOptions) => {
      // Ensure storage is present before continuing
      if (!storage) {
        return;
      }

      return getAnimalMarkerData(storage, marker);
    },
    [storage],
  );

  /**
   * Handle persisting animal data to the storage
   */
  const handleDataWrite = useCallback(
    (marker: AnimalMarkerOptions, data: AnimalMarkerData) => {
      // Ensure storage is present before continuing
      if (!storage) {
        return;
      }

      // Inject modification dates into custom data object
      const patch: AnimalMarkerData = {
        ...data,
        created: data.created ?? Date.now(),
        updated: Date.now(),
      };

      // Update storage with new custom data
      const markerKey = setAnimalMarkerData(storage, marker, patch);
      if (typeof markerKey !== 'string') {
        return;
      }

      setDataMap(current => ({
        ...current,
        [markerKey]: patch,
      }));
    },
    [storage],
  );

  // Load initial animal marker data from local storage
  useEffect(() => {
    const storage = getStorage();
    if (!storage) {
      return;
    }

    // Read entries from the storage and persist them
    const entries = getAnimalMarkerDataMap(storage);
    setDataMap(entries);
  }, []);

  // Create storage manager on load
  useEffect(() => setStorage(getStorage()), []);

  return useMemo(
    () => ({
      dataMap,
      onDataClear: handleDataClear,
      onDataRead: handleDataRead,
      onDataWrite: handleDataWrite,
    }),
    [dataMap, handleDataClear, handleDataRead, handleDataWrite],
  );
};
