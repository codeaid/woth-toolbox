import { MarkerOptions, MarkerPosition, MarkerType } from 'types/markers';

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
