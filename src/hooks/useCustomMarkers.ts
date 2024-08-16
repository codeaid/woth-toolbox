'use client';

import { useCallback } from 'react';
import { explorationMarkerId } from 'config/markers';
import { getCoordinateHash } from 'lib/markers';
import type { MapId } from 'types/cartography';
import type { Point } from 'types/generic';
import type { CustomMarker, CustomMarkerType } from 'types/markers';
import { useFirestoreCustomMarkers } from './useFirestoreCustomMarkers';
import { useLocalCustomMarkers } from './useLocalCustomMarkers';

export const useCustomMarkers = (mapId: MapId) => {
  const {
    markers,
    onClearTrackingMarkersAsync: onClearLocalTrackingMarkersAsync,
    onCreateCustomMarkerAsync: onCreateLocalCustomMarkerAsync,
    onDeleteCustomMarkerAsync: onDeleteLocalCustomMarkerAsync,
  } = useLocalCustomMarkers(mapId);

  const {
    onClearTrackingMarkersAsync: onClearFirestoreTrackingMarkersAsync,
    onCreateCustomMarkerAsync: onCreateFirestoreCustomMarkerAsync,
    onDeleteCustomMarkerAsync: onDeleteFirestoreCustomMarkerAsync,
  } = useFirestoreCustomMarkers(mapId);

  /**
   * Handle clearing all tracking markers
   */
  const handleClearTrackingAsync = useCallback(async () => {
    await onClearFirestoreTrackingMarkersAsync();
    await onClearLocalTrackingMarkersAsync();
  }, [onClearFirestoreTrackingMarkersAsync, onClearLocalTrackingMarkersAsync]);

  /**
   * Handle creating a new custom marker
   */
  const handleCreateCustomAsync = useCallback(
    async (type: CustomMarkerType, coords: Point) => {
      const marker: CustomMarker = {
        id:
          type === 'marker:exploration'
            ? explorationMarkerId
            : getCoordinateHash(coords),
        coords,
        type,
      };

      await onCreateFirestoreCustomMarkerAsync(marker);
      await onCreateLocalCustomMarkerAsync(marker);
    },
    [onCreateFirestoreCustomMarkerAsync, onCreateLocalCustomMarkerAsync],
  );

  /**
   * Handle deleting an existing custom marker
   */
  const handleDeleteCustomAsync = useCallback(
    async (marker: CustomMarker) => {
      await onDeleteFirestoreCustomMarkerAsync(marker);
      await onDeleteLocalCustomMarkerAsync(marker);
    },
    [onDeleteFirestoreCustomMarkerAsync, onDeleteLocalCustomMarkerAsync],
  );

  return {
    markers,
    onClearTrackingMarkersAsync: handleClearTrackingAsync,
    onCreateCustomMarkerAsync: handleCreateCustomAsync,
    onDeleteCustomMarkerAsync: handleDeleteCustomAsync,
  };
};
