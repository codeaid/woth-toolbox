import { useCallback, useEffect, useState } from 'react';
import { maxTrackingMarkerCount } from 'config/markers';
import { CustomMarkerContextValue } from 'contexts';
import { createMarkerOptions, hasSameCoordinates } from 'lib/markers';
import {
  clearCustomMarkerStore,
  readCustomMarkerStore,
  writeCustomMarkerStore,
} from 'lib/storage';
import { MapType } from 'types/cartography';
import { Point } from 'types/generic';
import { MarkerOptionsCustom, MarkerTypeCustom } from 'types/markers';
import { useStorage } from './useStorage';

/**
 * Custom marker data management helper hook
 */
export const useCustomMarkerManager = (): CustomMarkerContextValue => {
  // Name of the current map that is being managed
  const [currentMap, setCurrentMap] = useState<MapType>();

  // Custom marker storage
  const [markers, setMarkers] = useState<Array<MarkerOptionsCustom>>([]);

  // Retrieve storage manager
  const storage = useStorage();

  /**
   * Handle clearing all custom markers
   *
   * @param type Target type to clear
   */
  const handleClear = useCallback(
    (type: MarkerTypeCustom) =>
      setMarkers(current => current.filter(marker => marker.type !== type)),
    [],
  );

  /**
   * Handle creating a new exploration marker
   *
   * @param coords Target marker coordinates
   */
  const handleCreateExploration = useCallback(
    (coords: Point) =>
      setMarkers(current =>
        current
          .filter(marker => marker.type !== 'marker:exploration')
          .filter(marker => !hasSameCoordinates(marker, coords))
          .concat(createMarkerOptions('marker:exploration', coords)),
      ),
    [],
  );

  /**
   * Handle creating a new tracking marker
   *
   * @param coords Target marker coordinates
   */
  const handleCreateTracking = useCallback(
    (coords: Point) =>
      setMarkers(current =>
        current
          .filter(marker => !hasSameCoordinates(marker, coords))
          .concat(createMarkerOptions('marker:tracking', coords))
          .slice(-maxTrackingMarkerCount),
      ),
    [],
  );

  /**
   * Handle creating a new custom marker
   *
   * @param type Target marker type
   * @param coords Target marker coordinates
   */
  const handleCreate = useCallback(
    (type: MarkerTypeCustom, coords: Point) => {
      switch (type) {
        case 'marker:exploration':
          return handleCreateExploration(coords);
        case 'marker:tracking':
          return handleCreateTracking(coords);
      }
    },
    [handleCreateExploration, handleCreateTracking],
  );

  /**
   * Handle removing a custom marker
   *
   * @param marker Marker to remove
   */
  const handleDelete = useCallback(
    (marker: MarkerOptionsCustom) =>
      setMarkers(current => current.filter(m => m.id !== marker.id)),
    [],
  );

  /**
   * Handle reloading data from the storage
   */
  const handleReload = useCallback(() => {
    // Ensure storage is available before proceeding
    if (!storage || !currentMap) {
      return;
    }

    // Load marker data and store it locally
    const markers = readCustomMarkerStore(storage, currentMap);
    setMarkers(markers ?? []);
  }, [currentMap, storage]);

  // Retrieve custom marker data from storage when first loading in
  useEffect(() => handleReload(), [handleReload]);

  // Persist changes to custom marker data to storage
  useEffect(() => {
    if (!storage || !currentMap) {
      return;
    }

    // Clear store if no markers available or persist the ones that have been added
    if (!markers || !markers.length) {
      clearCustomMarkerStore(storage, currentMap);
    } else {
      writeCustomMarkerStore(storage, currentMap, markers);
    }
  }, [currentMap, markers, storage]);

  return {
    markers,
    onClear: handleClear,
    onCreate: handleCreate,
    onDelete: handleDelete,
    onReload: handleReload,
    onSetCurrentMap: setCurrentMap,
  };
};
