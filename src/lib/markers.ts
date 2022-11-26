import { AnimalType } from 'types/animals';
import {
  AnimalMarkerOptions,
  MarkerOptions,
  MarkerPosition,
  MarkerType,
} from 'types/markers';

/**
 * Create an animal marker from the supplied coordinates
 *
 * @param type Animal type
 * @param coords Animal icon coordinates
 * @param drinkZones List of drink zone coordinates
 * @param eatZones List of eat zone coordinates
 * @param sleepZones List of sleep zone coordinates
 */
export const createAnimalMarker = (
  type: AnimalType,
  coords: MarkerPosition,
  drinkZones: Array<MarkerPosition>,
  eatZones: Array<MarkerPosition>,
  sleepZones: Array<MarkerPosition>,
): AnimalMarkerOptions => ({
  coords,
  drink: createMarkerOptions('zone:drink', drinkZones),
  eat: createMarkerOptions('zone:eat', eatZones),
  sleep: createMarkerOptions('zone:sleep', sleepZones),
  type,
});

/**
 * Convert marker position to a marker options object of the specified type
 *
 * @param type Target marker type
 * @param positions Source list of marker positions
 */
export const createMarkerOptions = <TMarkerType extends MarkerType>(
  type: TMarkerType,
  positions: Array<MarkerPosition>,
): Array<MarkerOptions<TMarkerType>> =>
  positions.map(coords => ({ coords, type }));

/**
 * Generate marker key
 *
 * @param marker Source marker
 */
export const getMarkerKey = (marker: MarkerOptions) =>
  `${marker.type}:${marker.coords[0].toFixed(4)}:${marker.coords[1].toFixed(
    4,
  )}`;

/**
 * Calculate marker size at the current map scale
 *
 * @param mapScale Current map scale (zoom)
 * @param maxMarkerSize Maximum marker size in pixels
 */
export const getMarkerSize = (mapScale: number, maxMarkerSize: number) =>
  Math.min(maxMarkerSize, 100 * mapScale);

/**
 * Get list of visible marker options
 *
 * @param markers Source list of markers
 * @param visibleTypes List of visible marker types
 */
export const getVisibleMarkers = <TMarkerOptions extends MarkerOptions>(
  markers: Array<TMarkerOptions>,
  visibleTypes: Array<MarkerType>,
) =>
  markers.filter(
    marker => !visibleTypes.length || visibleTypes.includes(marker.type),
  );

/**
 * Determine if a marker is visible at the current map scale
 *
 * @param mapScale Current map scale (zoom)
 * @param type Marker type
 * @param visibilityMap Map of marker types and their minimum visibility scale
 */
export const isMarkerVisibleAtScale = (
  mapScale: number,
  type: MarkerType,
  visibilityMap: Map<MarkerType, number>,
) =>
  visibilityMap.has(type)
    ? mapScale >= (visibilityMap.get(type) ?? mapScale)
    : true;
