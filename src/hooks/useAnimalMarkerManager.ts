import { useCallback, useEffect, useState } from 'react';
import { AnimalMarkerContextValue } from 'contexts/AnimalMarkerContext';
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
export const useAnimalMarkerManager = (): AnimalMarkerContextValue => {
  // Browser storage manager
  const storage = useStorage();

  // Animal marker data map
  const [markers, setMarkers] = useState<Record<string, MarkerDataAnimal>>({});

  /**
   * Handle clearing animal data from the storage
   */
  const handleDeleteData = useCallback(
    (marker: MarkerOptionsAnimal) => {
      // Ensure storage is present before continuing
      if (!storage) {
        return;
      }

      // Remove marker entry in the storage
      const markerKey = clearAnimalMarkerStore(storage, marker);

      // Remove marker from the local cache
      setMarkers(current =>
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
  const handleReadData = useCallback(
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
   * Reload state from the storage
   */
  const handleReload = useCallback(() => {
    // Ensure storage is available before proceeding
    if (!storage) {
      return;
    }

    // Read entries from the storage and persist them
    const entries = readAnimalMarkerMap(storage);
    setMarkers(entries);
  }, [storage]);

  /**
   * Handle persisting animal data to the storage
   */
  const handleCreateData = useCallback(
    (marker: MarkerOptionsAnimal, data: MarkerDataAnimal) => {
      // Ensure storage is present before continuing
      if (!storage) {
        return;
      }

      // Remove empty data objects from the storage
      if (isEmptyAnimalMarker(data)) {
        return handleDeleteData(marker);
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

      setMarkers(current => ({
        ...current,
        [markerKey]: patch,
      }));
    },
    [handleDeleteData, storage],
  );

  // Load initial animal marker data from local storage
  useEffect(() => handleReload(), [handleReload]);

  return {
    markers,
    onCreateData: handleCreateData,
    onDeleteData: handleDeleteData,
    onReadData: handleReadData,
    onReload: handleReload,
  };
};
