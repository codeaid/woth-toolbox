'use client';

import { useCallback, useEffect, useState } from 'react';
import { maxTrackingMarkerCount } from 'config/markers';
import { hasSameCoordinates } from 'lib/markers';
import {
  storageReadCustomMarkerListAsync,
  storageWriteCustomMarkerListAsync,
} from 'lib/storage';
import type { MapId } from 'types/cartography';
import type { CustomMarker } from 'types/markers';
import { useStorage } from './useStorage';

/**
 * Custom marker data management helper hook
 */
export const useLocalCustomMarkers = (mapId: MapId) => {
  // Custom marker storage
  const [markers, setMarkers] = useState<CustomMarker[]>([]);

  // Retrieve storage manager
  const storage = useStorage();

  /**
   * Handle clearing all tracking markers
   *
   * @param type Target type to clear
   */
  const handleClearTrackingAsync = useCallback(
    async () =>
      setMarkers(current =>
        current.filter(marker => marker.type !== 'marker:tracking'),
      ),
    [],
  );

  /**
   * Handle creating a new exploration marker
   *
   * @param coords Target marker coordinates
   */
  const handleCreateExplorationAsync = useCallback(
    async (marker: CustomMarker) =>
      setMarkers(current =>
        current.filter(item => item.type !== marker.type).concat(marker),
      ),
    [],
  );

  /**
   * Handle creating a new tracking marker
   *
   * @param coords Target marker coordinates
   */
  const handleCreateTrackingAsync = useCallback(
    async (marker: CustomMarker) =>
      setMarkers(current =>
        current
          .filter(item => !hasSameCoordinates(item, marker.coords))
          .concat(marker)
          .slice(-maxTrackingMarkerCount),
      ),
    [],
  );

  /**
   * Handle creating a new custom marker
   */
  const handleCreateCustomAsync = useCallback(
    async (marker: CustomMarker) => {
      if (marker.type === 'marker:exploration') {
        await handleCreateExplorationAsync(marker);
      } else if (marker.type === 'marker:tracking') {
        await handleCreateTrackingAsync(marker);
      }
    },
    [handleCreateExplorationAsync, handleCreateTrackingAsync],
  );

  /**
   * Handle removing a custom marker
   *
   * @param marker Marker to remove
   */
  const handleDeleteCustomAsync = useCallback(async (marker: CustomMarker) => {
    if (marker.type === 'marker:exploration') {
      setMarkers(current =>
        current.filter(m => m.type !== 'marker:exploration'),
      );
    } else {
      setMarkers(current => current.filter(m => m.id !== marker.id));
    }
  }, []);

  // Retrieve custom marker data from storage when first loading in
  useEffect(() => {
    // Ensure storage is available before proceeding
    if (!storage) {
      return;
    }

    // Load marker data and store it locally
    storageReadCustomMarkerListAsync(storage, mapId).then(markers =>
      setMarkers(markers ?? []),
    );
  }, [mapId, storage]);

  // Persist changes to custom marker data to storage
  useEffect(() => {
    if (!storage) {
      return;
    }

    // Persist current list of custom markers for the specified map
    // noinspection JSIgnoredPromiseFromCall
    storageWriteCustomMarkerListAsync(storage, mapId, markers);
  }, [mapId, markers, storage]);

  return {
    markers,
    onClearTrackingMarkersAsync: handleClearTrackingAsync,
    onCreateCustomMarkerAsync: handleCreateCustomAsync,
    onDeleteCustomMarkerAsync: handleDeleteCustomAsync,
  };
};
