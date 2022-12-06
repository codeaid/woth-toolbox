import sha1 from 'sha1';
import { HuntingMapFilterOptions } from 'components/HuntingMapFilter';
import { animalMarkerTypes, genericMarkerTypes } from 'config/markers';
import { hasListValue } from 'lib/utils';
import {
  MapMarkerOptions,
  MapOptions,
  MapPoint,
  MapZoomOptions,
} from 'types/cartography';
import {
  AnimalMarkerOptions,
  AnimalMarkerType,
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
export const createAnimalMarkerOptions = (
  type: AnimalMarkerType,
  coords: MarkerPosition,
  drinkZones: Array<MarkerPosition>,
  eatZones: Array<MarkerPosition>,
  sleepZones: Array<MarkerPosition>,
): AnimalMarkerOptions => ({
  coords,
  drink: createMarkerOptions('zone:drink', drinkZones),
  eat: createMarkerOptions('zone:eat', eatZones),
  id: getCoordinateHash(coords),
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
 * Generate a hash from the specified coordinates
 *
 * @param x Marker's X offset
 * @param y Marker's Y offset
 */
export const getCoordinateHash = ([x, y]: MarkerPosition) =>
  sha1(`${x}:${y}`).substring(0, 8);

/**
 * Get marker color class based on its type
 *
 * @param marker Marker options
 * @param genericClass Generic marker CSS class
 * @param landmarkClass Landmark marker CSS class (cabin, camp, shooting range)
 * @param lodgeClass Lodge marker CSS class
 */
export const getGenericMarkerColorClass = (
  marker: MarkerOptions,
  genericClass: string,
  landmarkClass: string,
  lodgeClass: string,
) => {
  switch (marker.type) {
    case 'cabin':
    case 'camp':
    case 'shooting range':
      return landmarkClass;
    case 'lodge':
      return lodgeClass;
    default:
      return genericClass;
  }
};

/**
 * Generate marker key
 *
 * @param marker Source marker
 */
export const getMarkerKey = (marker: MarkerOptions) =>
  marker?.id ?? getCoordinateHash(marker.coords);

/**
 * Get marker's position relative to the map
 *
 * @param marker Marker options
 * @param mapOptions Map options
 * @param markerSize Marker size
 */
export const getMarkerOffset = (
  marker: MarkerOptions,
  mapOptions: MapOptions,
  markerSize: number,
): MapPoint => {
  const { mapHeight, mapWidth } = mapOptions;

  const [centerRatioX, centerRatioY] = marker.coords;
  const offsetX = mapWidth * centerRatioX - markerSize / 2;
  const offsetY = mapHeight * centerRatioY - markerSize / 2;

  return [offsetX, offsetY];
};

/**
 * Get list of marker types from the specified list of options
 *
 * @param markers Source list of markers
 */
export const getMarkerOptionTypes = (...markers: Array<MarkerOptions>) =>
  Array.from(
    markers.reduce<Set<MarkerType>>(
      (acc, current) => acc.add(current.type),
      new Set(),
    ),
  );

/**
 * Check if the specified type represents an animal marker type
 *
 * @param type Target type to check
 */
export const isAnimalMarkerType = <TMarkerType extends MarkerType>(
  type: TMarkerType,
) => animalMarkerTypes.includes(type as any);

/**
 * Check if the specified type represents a generic marker type
 *
 * @param type Target type to check
 */
export const isGenericMarkerType = <TMarkerType extends MarkerType>(
  type: TMarkerType,
) => genericMarkerTypes.includes(type as any);

/**
 * Determine if marker should always be represented in its highlighted form
 *
 * @param marker Marker to validate
 */
export const isHighlightedMarker = (marker: MarkerOptions) =>
  (['cabin', 'camp', 'lodge', 'shooting range'] as Array<MarkerType>).includes(
    marker.type,
  );

/**
 * Check if a marker is included in the specified filter
 *
 * @param marker Marker to validate
 * @param options Target filter options
 */
export const isMarkerFiltered = (
  marker: MarkerOptions,
  options: HuntingMapFilterOptions,
) => hasListValue(marker.type, options.selectedTypes);

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

/**
 * Update option marker positions
 *
 * @param mapOptions Map options
 * @param markerSize Target marker size
 * @param markerOptions List of marker options to process
 */
export const updateMarkerPositions = (
  mapOptions: MapOptions,
  markerSize: number,
  ...markerOptions: Array<Array<MapMarkerOptions>>
) =>
  markerOptions
    .flat()
    .filter(options => !!options.ref.current)
    .forEach(options => {
      // Extract marker options
      const { ref } = options;

      ref.current?.updatePosition(mapOptions);
    });

/**
 * Update option marker visibility based on filters
 *
 * @param filterOptions Filter options
 * @param markerOptions List of marker options to process
 */
export const updateMarkerVisibilityWithFilter = (
  filterOptions: HuntingMapFilterOptions,
  ...markerOptions: Array<Array<MapMarkerOptions>>
) =>
  markerOptions
    .flat()
    .filter(options => !!options.ref.current)
    .forEach(options => {
      const { marker, ref } = options;

      // Determine if marker should be visible with current filters
      const visible = isMarkerFiltered(marker, filterOptions);
      ref.current?.setVisibleWithFilter(visible);
    });

/**
 * Update option marker visibility based on zoom options
 *
 * @param zoomOptions Zoom options
 * @param zoomVisibilityMap Marker zoom visibility map
 * @param markerOptions List of marker options to process
 */
export const updateMarkerVisibilityWithZoom = (
  zoomOptions: MapZoomOptions,
  zoomVisibilityMap: Map<MarkerType, number>,
  ...markerOptions: Array<Array<MapMarkerOptions>>
) =>
  markerOptions
    .flat()
    .filter(options => !!options.ref.current)
    .forEach(options => {
      const { marker, ref } = options;
      const { zoomValue } = zoomOptions;

      // Determine if marker should be visible with current map zoom
      const visible = isMarkerVisibleAtScale(
        zoomValue,
        marker.type,
        zoomVisibilityMap,
      );

      ref.current?.setVisibleWithZoom(visible);
    });
