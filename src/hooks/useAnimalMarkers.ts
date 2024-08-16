'use client';

import { useCallback } from 'react';
import type { MapId } from 'types/cartography';
import type { AnimalMarkerRecord } from 'types/markers';
import { useFirestoreAnimalMarkers } from './useFirestoreAnimalMarkers';
import { useLocalAnimalMarkers } from './useLocalAnimalMarkers';

/**
 * Animal marker data management helper hook
 */
export const useAnimalMarkers = (mapId: MapId) => {
  const {
    recordMap,
    onCreateRecordAsync: onCreateLocalRecordAsync,
    onDeleteRecordAsync: onDeleteLocalRecordAsync,
    onUpdateRecordAsync: onUpdateLocalRecordAsync,
  } = useLocalAnimalMarkers(mapId);

  const {
    onCreateRecordAsync: onCreateFirestoreRecordAsync,
    onDeleteRecordAsync: onDeleteFirestoreRecordAsync,
    onUpdateRecordAsync: onUpdateFirestoreRecordAsync,
  } = useFirestoreAnimalMarkers(mapId);

  /**
   * Handle creating a new animal marker record
   */
  const handleCreateRecordAsync = useCallback(
    async (record: AnimalMarkerRecord) => {
      // Inject creation and modification dates into the record
      const patch: AnimalMarkerRecord = {
        ...record,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Create marker record on the server
      await onCreateLocalRecordAsync(patch);
      await onCreateFirestoreRecordAsync(patch);
    },
    [onCreateFirestoreRecordAsync, onCreateLocalRecordAsync],
  );

  /**
   * Handle reading animal data from Firebase
   */
  const handleReadRecord = useCallback(
    (id: string) => recordMap[id],
    [recordMap],
  );

  /**
   * Handle updating animal marker record data
   */
  const handleUpdateRecordAsync = useCallback(
    async (record: AnimalMarkerRecord) => {
      // Inject modification date into the record
      const patch: AnimalMarkerRecord = {
        ...record,
        updatedAt: new Date(),
      };

      // Update marker record on the server
      await onUpdateLocalRecordAsync(patch);
      await onUpdateFirestoreRecordAsync(patch);
    },
    [onUpdateFirestoreRecordAsync, onUpdateLocalRecordAsync],
  );

  /**
   * Handle clearing animal data from Firebase
   */
  const handleDeleteRecordAsync = useCallback(
    async (record: AnimalMarkerRecord) => {
      // Delete marker record from the server
      await onDeleteLocalRecordAsync(record);
      await onDeleteFirestoreRecordAsync(record);
    },
    [onDeleteFirestoreRecordAsync, onDeleteLocalRecordAsync],
  );

  return {
    recordMap,
    onCreateRecordAsync: handleCreateRecordAsync,
    onDeleteRecordAsync: handleDeleteRecordAsync,
    onReadRecord: handleReadRecord,
    onUpdateRecordAsync: handleUpdateRecordAsync,
  };
};
