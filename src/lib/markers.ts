import { MarkerOptions, MarkerPosition, MarkerType } from 'types/markers';

/**
 * Create marker position to option object converter
 *
 * @param type Target marker type
 */
export const createMarkerPositionConverter =
  (type: MarkerType) =>
  (pos: MarkerPosition): MarkerOptions => ({ pos, type });

/**
 * Get marker's opacity at the current map scale
 *
 * @param mapScale Current map scale (zoom)
 * @param marker Marker options
 * @param visibilityMap Map of marker types and their minimum visibility scale
 */
export const getMarkerOpacity = (
  mapScale: number,
  marker: MarkerOptions,
  visibilityMap: Map<MarkerType, number>,
) => (isMarkerVisibleAtScale(mapScale, marker.type, visibilityMap) ? 1 : 0);

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
export const getVisibleMarkers = (
  markers: Array<MarkerOptions>,
  visibleTypes: Array<MarkerType>,
) =>
  markers.filter(
    marker => !visibleTypes.length || visibleTypes.includes(marker.type),
  );

/**
 * Check if the specified marker is a generic marker
 *
 * @param marker Source marker options
 */
export const isGenericMarker = (marker: MarkerOptions) =>
  (
    [
      'cabin',
      'cabin:undiscovered',
      'camp',
      'echo',
      'hunting stand',
      'lodge',
      'photo',
      'shooting range',
      'view',
    ] as Array<MarkerType>
  ).includes(marker.type);

/**
 * Determine if a marker is visible at the current map scale
 *
 * @param mapScale Current map scale (zoom)
 * @param type Marker type
 * @param visibilityMap Map of marker types and their minimum visibility scale
 */
const isMarkerVisibleAtScale = (
  mapScale: number,
  type: MarkerType,
  visibilityMap: Map<MarkerType, number>,
) =>
  visibilityMap.has(type)
    ? mapScale >= (visibilityMap.get(type) ?? mapScale)
    : true;
