import sha1 from 'sha1';
import { HuntingMapFilterOptions } from 'components/HuntingMapFilter';
import {
  animalMarkerNeedZoneCounts,
  animalMarkerTypes,
  genericMarkerTypes,
} from 'config/markers';
import { hasListValue } from 'lib/utils';
import { AnimalType } from 'types/animals';
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
 * Get number of each need zone for the specified animal type
 *
 * @param type Target animal type
 */
export const getNeedZoneCounts = (type: AnimalType) =>
  animalMarkerNeedZoneCounts.get(type) ?? [0, 0, 0];

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
 * Update marker visibility based on filters and zoom
 *
 * @param filterOptions Filter options
 * @param zoomOptions Zoom options
 * @param zoomVisibilityMap Marker zoom visibility map
 * @param markerOptions List of marker options to process
 */
export const updateMarkerVisibility = (
  filterOptions: HuntingMapFilterOptions,
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

      // Determine if marker should be visible with current filters
      const visibleWithFilter = isMarkerFiltered(marker, filterOptions);

      // Determine if marker matches the only filter type currently selected
      const visibleWithOnlyFilter =
        visibleWithFilter && filterOptions.selectedTypes.length === 1;

      // Always show markers if they match the only selected type
      if (visibleWithOnlyFilter) {
        ref.current?.setVisible(true);
        return;
      }

      // Determine if marker should be visible with current map zoom
      const visibleWithZoom = isMarkerVisibleAtScale(
        zoomValue,
        marker.type,
        zoomVisibilityMap,
      );

      ref.current?.setVisible(visibleWithFilter && visibleWithZoom);
    });
