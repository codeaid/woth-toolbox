import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  clearAnimalMarkerStore,
  isEmptyAnimalMarker,
  readAnimalMarkerMap,
  readAnimalMarkerStore,
  writeAnimalMarkerStore,
} from 'lib/storage';
import { MarkerDataAnimal, MarkerOptionsAnimal } from 'types/markers';
import { useStorage } from './useStorage';

/**
 * Animal marker data management helper hook
 */
export const useAnimalMarkerData = () => {
  // Browser storage manager
  const storage = useStorage();

  // Animal marker data
  const [dataMap, setDataMap] = useState<Record<string, MarkerDataAnimal>>({});

  /**
   * Handle clearing animal data from the storage
   */
  const handleDataClear = useCallback(
    (marker: MarkerOptionsAnimal) => {
      // Ensure storage is present before continuing
      if (!storage) {
        return;
      }

      const markerKey = clearAnimalMarkerStore(storage, marker);
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

      return readAnimalMarkerStore(storage, marker);
    },
    [storage],
  );

  /**
   * Handle persisting animal data to the storage
   */
  const handleDataWrite = useCallback(
    (marker: MarkerOptionsAnimal, data: MarkerDataAnimal) => {
      // Ensure storage is present before continuing
      if (!storage) {
        return;
      }

      // Remove empty data objects from the storage
      if (isEmptyAnimalMarker(data)) {
        return handleDataClear(marker);
      }

      // Inject modification dates into custom data object
      const patch: MarkerDataAnimal = {
        ...data,
        created: data.created ?? Date.now(),
        updated: Date.now(),
      };

      // Update storage with new custom data
      const markerKey = writeAnimalMarkerStore(storage, marker, patch);
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
    const entries = readAnimalMarkerMap(storage);
    setDataMap(entries);
  }, [storage]);

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
