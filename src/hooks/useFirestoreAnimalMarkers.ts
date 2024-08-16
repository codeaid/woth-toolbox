'use client';

import { onSnapshot } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import {
  firestoreCreateAnimalMarkerListRef,
  firestoreDeleteAnimalMarkerAsync,
  firestoreUpdateAnimalMarkerAsync,
} from 'lib/firestore';
import type { MapId } from 'types/cartography';
import type { AnimalMarkerRecord } from 'types/markers';
import { useFirebase } from './useFirebase';

/**
 * Animal marker data management helper hook
 */
export const useFirestoreAnimalMarkers = (mapId: MapId) => {
  const { userId } = useFirebase();

  // List of current animal marker records
  const [recordMap, setRecordMap] = useState<
    Record<string, AnimalMarkerRecord>
  >({});

  /**
   * Handle creating a new animal marker record
   */
  const handleCreateRecordAsync = useCallback(
    async (record: AnimalMarkerRecord) =>
      await firestoreUpdateAnimalMarkerAsync(userId, mapId, record),
    [mapId, userId],
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
    async (record: AnimalMarkerRecord) =>
      await firestoreUpdateAnimalMarkerAsync(userId, mapId, record),
    [mapId, userId],
  );

  /**
   * Handle clearing animal data from Firebase
   */
  const handleDeleteRecordAsync = useCallback(
    async (record: AnimalMarkerRecord) =>
      await firestoreDeleteAnimalMarkerAsync(userId, mapId, record),
    [mapId, userId],
  );

  // Load available animal marker records on mount
  useEffect(() => {
    // Create reference to the animal marker collection for the current map
    const mapRef = firestoreCreateAnimalMarkerListRef(userId, mapId);

    return onSnapshot(mapRef, { includeMetadataChanges: true }, snapshot =>
      setRecordMap(current =>
        // Generate the updated map of marker customisations
        snapshot.docChanges().reduce(
          (acc, change) => {
            // Remove deleted markers from the map
            if (change.type === 'removed') {
              delete acc[change.doc.id];
              return acc;
            }

            // Convert Firestore dates to Date instances
            const { createdAt, updatedAt, ...rest } = change.doc.data();
            const record: AnimalMarkerRecord = {
              ...rest,
              createdAt: createdAt.toDate(),
              updatedAt: updatedAt.toDate(),
            };

            // Replace or add markers that have been added or updated in Firestore
            return { ...acc, [change.doc.id]: record };
          },
          { ...current },
        ),
      ),
    );
  }, [mapId, userId]);

  return {
    recordMap,
    onCreateRecordAsync: handleCreateRecordAsync,
    onDeleteRecordAsync: handleDeleteRecordAsync,
    onReadRecord: handleReadRecord,
    onUpdateRecordAsync: handleUpdateRecordAsync,
  };
};
