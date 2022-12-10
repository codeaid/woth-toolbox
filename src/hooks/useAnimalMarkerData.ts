import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  clearAnimalMarkerData,
  getAnimalMarkerData,
  getAnimalMarkerDataMap,
  getStorage,
  isEmptyAnimalData,
  setAnimalMarkerData,
} from 'lib/storage';
import { MarkerStorageRecordAnimal, MarkerOptionsAnimal } from 'types/markers';

/**
 * Animal marker data management helper hook
 */
export const useAnimalMarkerData = () => {
  const [storage, setStorage] = useState<Storage>();

  // Animal marker data
  const [dataMap, setDataMap] = useState<
    Record<string, MarkerStorageRecordAnimal>
  >({});

  /**
   * Handle clearing animal data from the storage
   */
  const handleDataClear = useCallback(
    (marker: MarkerOptionsAnimal) => {
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
    (marker: MarkerOptionsAnimal) => {
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
    (marker: MarkerOptionsAnimal, data: MarkerStorageRecordAnimal) => {
      // Ensure storage is present before continuing
      if (!storage) {
        return;
      }

      // Remove empty data objects from the storage
      if (isEmptyAnimalData(data)) {
        return handleDataClear(marker);
      }

      // Inject modification dates into custom data object
      const patch: MarkerStorageRecordAnimal = {
        ...data,
        created: data.created ?? Date.now(),
        updated: Date.now(),
      };

      // Update storage with new custom data
      const markerKey = setAnimalMarkerData(storage, marker, patch);
      if (!markerKey) {
        return;
      }

      setDataMap(current => ({
        ...current,
        [markerKey]: patch,
      }));
    },
    [handleDataClear, storage],
  );

  // Load initial animal marker data from local storage
  useEffect(() => {
    // Ensure storage is available before proceeding
    if (!storage) {
      return;
    }

    // Read entries from the storage and persist them
    const entries = getAnimalMarkerDataMap(storage);
    setDataMap(entries);
  }, [storage]);

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
