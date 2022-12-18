import { useCallback, useEffect, useMemo, useState } from 'react';
import { createMarkerOptions, hasSameCoordinates } from 'lib/markers';
import {
  clearCustomMarkerStore,
  getCustomMarkerStore,
  setCustomMarkerStore,
} from 'lib/storage';
import { Point } from 'types/generic';
import { MarkerOptionsCustom, MarkerTypeCustom } from 'types/markers';
import { useStorage } from './useStorage';

export const useCustomMarkers = () => {
  // Custom marker storage
  const [customMarkers, setCustomMarkers] = useState<
    Array<MarkerOptionsCustom>
  >([]);

  // Browser storage manager
  const storage = useStorage();

  /**
   * Handle creating a new exploration marker
   *
   * @param coords Target marker coordinates
   */
  const handleExplorationMarkerCreate = useCallback(
    (coords: Point) =>
      setCustomMarkers(current =>
        current
          .filter(marker => marker.type !== 'marker:exploration')
          .filter(marker => !hasSameCoordinates(marker, coords))
          .concat(createMarkerOptions('marker:exploration', coords)),
      ),
    [],
  );

  /**
   * Handle removing the current exploration marker
   */
  const handleExplorationMarkerRemove = useCallback(
    () =>
      setCustomMarkers(current =>
        current.filter(m => m.type !== 'marker:exploration'),
      ),
    [],
  );

  /**
   * Handle creating a new tracking marker
   *
   * @param coords Target marker coordinates
   */
  const handleTrackingMarkerCreate = useCallback(
    (coords: Point) =>
      setCustomMarkers(current =>
        current
          .filter(marker => !hasSameCoordinates(marker, coords))
          .concat(createMarkerOptions('marker:tracking', coords)),
      ),
    [],
  );

  /**
   * Handle removing a tracking marker
   *
   * @param target Target marker to remove
   */
  const handleTrackingMarkerRemove = useCallback(
    (target: MarkerOptionsCustom) =>
      setCustomMarkers(current =>
        current.filter(marker => marker.id !== target.id),
      ),
    [],
  );

  /**
   * Handle clearing all tracking markers
   */
  const handleTrackingMarkersClear = useCallback(
    () =>
      setCustomMarkers(current =>
        current.filter(m => m.type !== 'marker:tracking'),
      ),
    [],
  );

  /**
   * Handle creating a new custom marker
   *
   * @param type Target marker type
   * @param coords Target marker coordinates
   */
  const handleCustomMarkerCreate = useCallback(
    (type: MarkerTypeCustom, coords: Point) => {
      if (type === 'marker:exploration') {
        handleExplorationMarkerCreate(coords);
      } else if (type === 'marker:tracking') {
        handleTrackingMarkerCreate(coords);
      }
    },
    [handleExplorationMarkerCreate, handleTrackingMarkerCreate],
  );

  /**
   * Handle removing a custom marker
   *
   * @param marker Marker to remove
   */
  const handleCustomMarkerRemove = useCallback(
    (marker: MarkerOptionsCustom) => {
      if (marker.type === 'marker:exploration') {
        handleExplorationMarkerRemove();
      } else if (marker.type === 'marker:tracking') {
        handleTrackingMarkerRemove(marker);
      }
    },
    [handleExplorationMarkerRemove, handleTrackingMarkerRemove],
  );

  /**
   * Handle clearing all custom markers
   *
   * @param type Target type to clear
   */
  const handleCustomMarkersClear = useCallback(
    (type?: MarkerTypeCustom) => {
      if (type === 'marker:exploration') {
        handleExplorationMarkerRemove();
      } else if (type === 'marker:tracking') {
        handleTrackingMarkersClear();
      } else {
        setCustomMarkers([]);
      }
    },
    [handleExplorationMarkerRemove, handleTrackingMarkersClear],
  );

  // Retrieve custom marker data from storage when first loading in
  useEffect(() => {
    // Ensure storage is available before proceeding
    if (!storage) {
      return;
    }

    // Load marker data and store it locally
    const markers = getCustomMarkerStore(storage);
    setCustomMarkers(markers ?? []);
  }, [storage]);

  // Persist changes to custom marker data to storage
  useEffect(() => {
    if (!storage) {
      return;
    }

    // Clear store if no markers available or persist the ones that have been added
    if (!customMarkers || !customMarkers.length) {
      clearCustomMarkerStore(storage);
    } else {
      setCustomMarkerStore(storage, customMarkers);
    }
  }, [customMarkers, storage]);

  return useMemo(
    () => ({
      customMarkers,
      onCustomMarkerCreate: handleCustomMarkerCreate,
      onCustomMarkerRemove: handleCustomMarkerRemove,
      onCustomMarkersClear: handleCustomMarkersClear,
    }),
    [
      customMarkers,
      handleCustomMarkerCreate,
      handleCustomMarkerRemove,
      handleCustomMarkersClear,
    ],
  );
};
