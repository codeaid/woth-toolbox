import { useCallback, useEffect, useState } from 'react';
import type { AnimalMarkerContextValue } from 'contexts';
import {
  clearAnimalMarkerStorageItem,
  isEmptyAnimalMarker,
  readAnimalMarkerStorage,
  readAnimalMarkerStorageItem,
  writeAnimalMarkerStorageItem,
} from 'lib/storage';
import type { MapType } from 'types/cartography';
import type { MarkerDataAnimal, MarkerOptionsAnimal } from 'types/markers';
import { useStorage } from './useStorage';

/**
 * Animal marker data management helper hook
 */
export const useAnimalMarkerManager = (
  mapType?: MapType,
): AnimalMarkerContextValue => {
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
      if (!storage || !mapType) {
        return;
      }

      // Remove marker entry in the storage
      clearAnimalMarkerStorageItem(storage, mapType, marker.id);

      // Remove marker from the local cache
      setMarkers(current =>
        Object.fromEntries(
          Object.entries(current).filter(([key]) => key !== marker.id),
        ),
      );
    },
    [mapType, storage],
  );

  /**
   * Handle reading animal data from the storage
   */
  const handleReadData = useCallback(
    (marker: MarkerOptionsAnimal) => {
      // Ensure storage is present before continuing
      if (!storage || !mapType) {
        return;
      }

      return readAnimalMarkerStorageItem(storage, mapType, marker.id);
    },
    [mapType, storage],
  );

  /**
   * Reload state from the storage
   */
  const handleReload = useCallback(() => {
    // Ensure storage is available before proceeding
    if (!storage) {
      return;
    }

    if (mapType) {
      // Read entries from the storage and persist them
      const entries = readAnimalMarkerStorage(storage, mapType);
      setMarkers(Object.fromEntries(entries));
    } else {
      // Clear local markers when navigating away from map pages
      setMarkers({});
    }
  }, [mapType, storage]);

  /**
   * Handle persisting animal data to the storage
   */
  const handleCreateData = useCallback(
    (marker: MarkerOptionsAnimal, data: MarkerDataAnimal) => {
      // Ensure storage is present before continuing
      if (!storage || !mapType) {
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
      const success = writeAnimalMarkerStorageItem(
        storage,
        mapType,
        marker.id,
        patch,
      );

      if (!success) {
        return;
      }

      setMarkers(current => ({
        ...current,
        [marker.id]: patch,
      }));
    },
    [mapType, handleDeleteData, storage],
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
