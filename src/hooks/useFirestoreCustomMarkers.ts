'use client';

import { onSnapshot } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { explorationMarkerId } from 'config/markers';
import {
  firestoreClearTrackingMarkersAsync,
  firestoreCreateCustomMarkerAsync,
  firestoreCreateCustomMarkerRef,
  firestoreDeleteCustomMarkerAsync,
} from 'lib/firestore';
import type { MapId } from 'types/cartography';
import type {
  CustomMarkerDocument,
  CustomMarkerDocumentEntryId,
} from 'types/firestore';
import type { Point } from 'types/generic';
import type { CustomMarker } from 'types/markers';
import { useFirebase } from './useFirebase';

export const useFirestoreCustomMarkers = (mapId: MapId) => {
  const { userId } = useFirebase();

  // Local cache of the custom marker document
  const [document, setDocument] = useState<CustomMarkerDocument>({});

  // Current map of custom markers
  const markers = useMemo(
    () =>
      (
        Object.entries(document) as [CustomMarkerDocumentEntryId, Point][]
      ).map<CustomMarker>(([id, coords]) => ({
        id,
        coords,
        type:
          id === explorationMarkerId ? 'marker:exploration' : 'marker:tracking',
      })),
    [document],
  );

  /**
   * Handle clearing all tracking markers
   */
  const handleClearTrackingAsync = useCallback(
    async () => await firestoreClearTrackingMarkersAsync(userId, mapId),
    [mapId, userId],
  );

  /**
   * Handle creating a new custom marker
   */
  const handleCreateCustomAsync = useCallback(
    async (marker: CustomMarker) =>
      await firestoreCreateCustomMarkerAsync(userId, mapId, marker),
    [mapId, userId],
  );

  /**
   * Handle deleting an existing custom marker
   */
  const handleDeleteCustomAsync = useCallback(
    async (marker: CustomMarker) =>
      await firestoreDeleteCustomMarkerAsync(userId, mapId, marker.id),
    [mapId, userId],
  );

  // Listen to custom marker document updates
  useEffect(() => {
    // Create a reference to the custom marker document for the current map
    const docRef = firestoreCreateCustomMarkerRef(userId, mapId);

    return onSnapshot(docRef, snapshot => setDocument(snapshot.data() ?? {}));
  }, [mapId, userId]);

  return {
    markers,
    onClearTrackingMarkersAsync: handleClearTrackingAsync,
    onCreateCustomMarkerAsync: handleCreateCustomAsync,
    onDeleteCustomMarkerAsync: handleDeleteCustomAsync,
  };
};
