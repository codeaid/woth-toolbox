import { useCallback, useEffect, useMemo, useState } from 'react';
import { DebugPanelSettings } from 'components/DebugPanel';
import {
  copyTextToClipboard,
  getAnimalMarkerCreateCode,
  isMarkerComplete,
  removeMarkerDrinkZone,
  removeMarkerEatZone,
  removeMarkerSleepZone,
  pushNextMarkerCoords,
  removeMarker,
  replaceMarker,
  consoleLogClean,
} from 'lib/debug';
import { AnimalMarkerOptions } from 'types/markers';

export const useDebugPanel = () => {
  // Current in-progress marker and all debug marker state
  const [currentMarker, setCurrentMarker] = useState<AnimalMarkerOptions>();
  const [debugMarkers, setDebugMarkers] = useState<Array<AnimalMarkerOptions>>(
    [],
  );

  // Current debut panel settings
  const [settings, setSettings] = useState<DebugPanelSettings>();

  /**
   * Handle adding new coordinates to the list
   *
   * @param x Left marker map ratio
   * @param x Top marker map ratio
   */
  const handleCoordinatesAdd = useCallback(
    (x: number, y: number) => {
      // Ensure panel is open and enabled
      if (!settings || !settings.enabled || !settings.open) {
        return;
      }

      // Log coordinates to console
      consoleLogClean([x, y]);

      // Update current marker with new coordinates
      setCurrentMarker(current =>
        pushNextMarkerCoords(
          current,
          settings.type,
          settings.drinkZoneCount,
          settings.eatZoneCount,
          settings.sleepZoneCount,
          [x, y],
        ),
      );
    },
    [settings],
  );

  /**
   * Handle clearing all debug markers
   */
  const handleClear = useCallback(async () => {
    setCurrentMarker(undefined);
    setDebugMarkers([]);
  }, []);

  /**
   * Handle copying all completed markers as code
   */
  const handleCopy = useCallback(async () => {
    const code = debugMarkers.map(getAnimalMarkerCreateCode).join('');
    await copyTextToClipboard(code);
  }, [debugMarkers]);

  /**
   * Handle removing the last drink zone from the specified marker
   *
   * @param marker Target marker to update
   * @param index Need zone index to remove
   */
  const handleDrinkZoneRemove = useCallback(
    (marker: AnimalMarkerOptions, index: number) => {
      const patch = removeMarkerDrinkZone(marker, index);

      if (patch.id === currentMarker?.id) {
        setCurrentMarker(patch);
        return;
      }

      setDebugMarkers(current => replaceMarker(current, patch));
    },
    [currentMarker?.id],
  );

  /**
   * Handle removing the last eat zone from the specified marker
   *
   * @param marker Target marker to update
   * @param index Need zone index to remove
   */
  const handleEatZoneRemove = useCallback(
    (marker: AnimalMarkerOptions, index: number) => {
      const patch = removeMarkerEatZone(marker, index);

      if (patch.id === currentMarker?.id) {
        setCurrentMarker(patch);
        return;
      }

      setDebugMarkers(current => replaceMarker(current, patch));
    },
    [currentMarker?.id],
  );

  /**
   * Handle deleting a debug marker
   *
   * @param marker Target marker to remove
   */
  const handleMarkerDelete = useCallback(
    (marker: AnimalMarkerOptions) => {
      // Delete current marker
      if (marker.id === currentMarker?.id) {
        setCurrentMarker(undefined);
        return;
      }

      setDebugMarkers(current => removeMarker(current, marker));
    },
    [currentMarker],
  );

  /**
   * Handle removing the last sleep zone from the specified marker
   *
   * @param marker Target marker to update
   * @param index Need zone index to remove
   */
  const handleSleepZoneRemove = useCallback(
    (marker: AnimalMarkerOptions, index: number) => {
      const patch = removeMarkerSleepZone(marker, index);

      if (patch.id === currentMarker?.id) {
        setCurrentMarker(patch);
        return;
      }

      setDebugMarkers(current => replaceMarker(current, patch));
    },
    [currentMarker?.id],
  );

  // Add current marker to the list of completed ones when it's done
  useEffect(() => {
    if (
      currentMarker &&
      settings &&
      isMarkerComplete(
        currentMarker,
        settings.drinkZoneCount,
        settings.eatZoneCount,
        settings.sleepZoneCount,
      )
    ) {
      setDebugMarkers(current =>
        current.concat({
          ...currentMarker,
          debug: { created: new Date() },
        }),
      );
      setCurrentMarker(undefined);
    }
  }, [currentMarker, settings]);

  return useMemo(
    () => ({
      currentDebugMarker: currentMarker,
      debugMarkers,
      debugMarkersWithCurrent: currentMarker
        ? debugMarkers.concat(currentMarker)
        : debugMarkers,
      onDebugClear: handleClear,
      onDebugCoordinates: handleCoordinatesAdd,
      onDebugCopy: handleCopy,
      onDebugDrinkZoneRemove: handleDrinkZoneRemove,
      onDebugEatZoneRemove: handleEatZoneRemove,
      onDebugMarkerDelete: handleMarkerDelete,
      onDebugSettingsChange: setSettings,
      onDebugSleepZoneRemove: handleSleepZoneRemove,
    }),
    [
      currentMarker,
      debugMarkers,
      handleClear,
      handleCoordinatesAdd,
      handleCopy,
      handleDrinkZoneRemove,
      handleEatZoneRemove,
      handleMarkerDelete,
      handleSleepZoneRemove,
    ],
  );
};
