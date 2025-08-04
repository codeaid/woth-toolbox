'use client';

import { useCallback } from 'react';
import { explorationMarkerId } from 'config/markers';
import { getCoordinateHash } from 'lib/markers';
import type { MapId } from 'types/cartography';
import type { Point } from 'types/generic';
import type { CustomMarker, CustomMarkerType } from 'types/markers';
import { useLocalCustomMarkers } from './useLocalCustomMarkers';

export const useCustomMarkers = (mapId: MapId) => {
  const {
    markers,
    onClearTrackingMarkersAsync: onClearLocalTrackingMarkersAsync,
    onCreateCustomMarkerAsync: onCreateLocalCustomMarkerAsync,
    onDeleteCustomMarkerAsync: onDeleteLocalCustomMarkerAsync,
  } = useLocalCustomMarkers(mapId);

  /**
   * Handle clearing all tracking markers
   */
  const handleClearTrackingAsync = useCallback(async () => {
    await onClearLocalTrackingMarkersAsync();
  }, [onClearLocalTrackingMarkersAsync]);

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

      await onCreateLocalCustomMarkerAsync(marker);
    },
    [onCreateLocalCustomMarkerAsync],
  );

  /**
   * Handle deleting an existing custom marker
   */
  const handleDeleteCustomAsync = useCallback(
    async (marker: CustomMarker) => {
      await onDeleteLocalCustomMarkerAsync(marker);
    },
    [onDeleteLocalCustomMarkerAsync],
  );

  return {
    markers,
    onClearTrackingMarkersAsync: handleClearTrackingAsync,
    onCreateCustomMarkerAsync: handleCreateCustomAsync,
    onDeleteCustomMarkerAsync: handleDeleteCustomAsync,
  };
};
