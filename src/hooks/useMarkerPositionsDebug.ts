import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  consoleLogClean,
  copyTextToClipboard,
  getMarkerOptionSnippet,
} from 'lib/debug';
import { AnimalType } from 'types/animals';
import { MarkerPosition } from 'types/markers';

/**
 * Hook exposing a function allowing to register marker positions and print
 * JavaScript code needed to add it to the list of animal markers
 *
 * @param animalType Target animal type
 * @param mapWidth Width of the map being processed
 * @param mapHeight Height of the map being processed
 * @param drinkZoneCount Number of drink zones to print
 * @param eatZoneCount Number of feed zones to print
 * @param sleepZoneCount Number of sleep zones to print
 * @param logToConsole Enable logging debug output to browser's console
 * @param copyToClipboard Automatically copy generated code snippet to clipboard
 */
export const useMarkerPositionsDebug = (
  animalType: AnimalType,
  mapWidth: number,
  mapHeight: number,
  drinkZoneCount: number,
  eatZoneCount: number,
  sleepZoneCount: number,
  logToConsole = true,
  copyToClipboard = true,
) => {
  // List of registered positions
  const [positions, setPositions] = useState<Array<MarkerPosition>>([]);

  /**
   * Callback to add a new position to the stack
   *
   * @param x Marker's left offset
   * @param y Marker's top offset
   */
  const registerPosition = useCallback(
    (x: number, y: number) => {
      // Calculate offset percentage in relation to the map size
      const ratioX = x / mapWidth;
      const ratioY = y / mapHeight;

      // Print position to the console
      const position: MarkerPosition = [ratioX, ratioY];

      // Add marker to the list
      setPositions(current => [...current, position]);

      // Log coordinates to console if enabled
      if (logToConsole) {
        consoleLogClean(position, positions.length + 1);
      }
    },
    [logToConsole, mapHeight, mapWidth, positions.length],
  );

  // Total target number of coordinates
  const totalZoneCount = useMemo(
    () => drinkZoneCount + eatZoneCount + sleepZoneCount + 1,
    [drinkZoneCount, eatZoneCount, sleepZoneCount],
  );

  // Process position list once it fills up
  useEffect(() => {
    // Process marker queue
    if (positions.length !== totalZoneCount) {
      return;
    }

    // Generate code snippet
    const code = getMarkerOptionSnippet(
      animalType,
      positions,
      drinkZoneCount,
      eatZoneCount,
      sleepZoneCount,
    );

    // Log to browser's console if needed
    if (logToConsole) {
      consoleLogClean(code);
    }

    // Copy to clipboard if needed
    if (copyToClipboard) {
      // noinspection JSIgnoredPromiseFromCall
      copyTextToClipboard(code);
    }

    // Reset current list of markers
    setPositions([]);
  }, [
    animalType,
    copyToClipboard,
    drinkZoneCount,
    eatZoneCount,
    logToConsole,
    positions,
    sleepZoneCount,
    totalZoneCount,
  ]);

  return registerPosition;
};
