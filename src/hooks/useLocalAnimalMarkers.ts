'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  storageDeleteAnimalMarkerAsync,
  storageReadAnimalMarkerAsync,
  storageReadAnimalMarkerMapAsync,
  storageUpdateAnimalMarkerAsync,
} from 'lib/storage';
import type { MapId } from 'types/cartography';
import type { AnimalMarkerRecord } from 'types/markers';
import { useStorage } from './useStorage';

/**
 * Animal marker data management helper hook
 */
export const useLocalAnimalMarkers = (mapId: MapId) => {
  // Browser storage manager
  const storage = useStorage();

  // Animal marker data map
  const [recordMap, setRecordMap] = useState<
    Record<string, AnimalMarkerRecord>
  >({});

  /**
   * Handle persisting animal data to the storage
   */
  const handleCreateRecordAsync = useCallback(
    async (record: AnimalMarkerRecord) => {
      // Ensure storage is present before continuing
      if (!storage) {
        return;
      }

      // Update storage with new custom data
      await storageUpdateAnimalMarkerAsync(storage, mapId, record.id, record);
      setRecordMap(current => ({ ...current, [record.id]: record }));
    },
    [mapId, storage],
  );

  /**
   * Handle reading animal data from the storage
   */
  const handleReadRecordAsync = useCallback(
    async (record: AnimalMarkerRecord) => {
      // Ensure storage is present before continuing
      if (!storage) {
        return;
      }

      return await storageReadAnimalMarkerAsync(storage, mapId, record.id);
    },
    [mapId, storage],
  );

  /**
   * Handle updating animal data in the storage
   */
  const handleUpdateRecordAsync = useCallback(
    async (record: AnimalMarkerRecord) => {
      // Ensure storage is present before continuing
      if (!storage) {
        return;
      }

      // Update storage with new custom data
      await storageUpdateAnimalMarkerAsync(storage, mapId, record.id, record);
      setRecordMap(current => ({ ...current, [record.id]: record }));
    },
    [mapId, storage],
  );

  /**
   * Handle clearing animal data from the storage
   */
  const handleDeleteRecordAsync = useCallback(
    async (record: AnimalMarkerRecord) => {
      // Ensure storage is present before continuing
      if (!storage) {
        return;
      }

      // Remove marker entry in the storage
      await storageDeleteAnimalMarkerAsync(storage, mapId, record.id);

      // Remove marker from the local cache
      setRecordMap(current =>
        Object.fromEntries(
          Object.entries(current).filter(([key]) => key !== record.id),
        ),
      );
    },
    [mapId, storage],
  );

  // Load initial animal marker data from local storage
  useEffect(() => {
    // Ensure storage is available before proceeding
    if (!storage) {
      return;
    }

    if (mapId) {
      // Read entries from the storage and persist them
      storageReadAnimalMarkerMapAsync(storage, mapId).then(entries =>
        setRecordMap(Object.fromEntries(entries)),
      );
    } else {
      // Clear local markers when navigating away from map pages
      setRecordMap({});
    }
  }, [mapId, storage]);

  return {
    recordMap,
    onCreateRecordAsync: handleCreateRecordAsync,
    onDeleteRecordAsync: handleDeleteRecordAsync,
    onReadRecord: handleReadRecordAsync,
    onUpdateRecordAsync: handleUpdateRecordAsync,
  };
};
