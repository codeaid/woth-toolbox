import sha1 from 'sha1';
import {
  animalMarkerNeedZoneCounts,
  animalMarkerTypes,
  genericMarkerTypes,
  needZoneMarkerTypes,
} from 'config/markers';
import { hasListValue } from 'lib/utils';
import { AnimalType } from 'types/animals';
import { MapFilterOptions, MapZoomOptions } from 'types/cartography';
import { Point } from 'types/generic';
import {
  MarkerOptions,
  MarkerOptionsAnimal,
  MarkerOptionsGeneric,
  MarkerReference,
  MarkerType,
  MarkerTypeAnimal,
  MarkerTypeGeneric,
  MarkerTypeNeedZone,
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
  type: MarkerTypeAnimal,
  coords: Point,
  drinkZones: Array<Point>,
  eatZones: Array<Point>,
  sleepZones: Array<Point>,
): MarkerOptionsAnimal => ({
  coords,
  drink: createMarkerOptionsList('zone:drink', drinkZones),
  eat: createMarkerOptionsList('zone:eat', eatZones),
  id: getCoordinateHash(coords),
  sleep: createMarkerOptionsList('zone:sleep', sleepZones),
  type,
});

/**
 * Create new custom marker options
 *
 * @param type Target marker type
 * @param coords Marker coordinates
 */
export const createMarkerOptions = <TMarkerType extends MarkerType>(
  type: TMarkerType,
  coords: Point,
) => ({
  coords,
  id: getCoordinateHash(coords),
  type,
});

/**
 * Convert marker position to a marker options object of the specified type
 *
 * @param type Target marker type
 * @param positions Source list of marker positions
 */
export const createMarkerOptionsList = <TMarkerType extends MarkerType>(
  type: TMarkerType,
  positions: Array<Point>,
): Array<MarkerOptions<TMarkerType>> =>
  positions.map(coords => createMarkerOptions(type, coords));

/**
 * Generate a hash from the specified coordinates
 *
 * @param x Marker's X offset
 * @param y Marker's Y offset
 */
export const getCoordinateHash = ([x, y]: Point) =>
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
  marker: MarkerOptionsGeneric,
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
 * Check if both markers have the same coordinates
 *
 * @param marker Source marker
 * @param coords Target coordinates
 */
export const hasSameCoordinates = (marker: MarkerOptions, coords: Point) =>
  marker.coords[0] === coords[0] && marker.coords[1] === coords[1];

/**
 * Check if the specified type represents an animal marker type
 *
 * @param type Target type to check
 */
export const isAnimalMarkerType = (
  type?: MarkerType,
): type is MarkerTypeAnimal => animalMarkerTypes.includes(type as any);

/**
 * Check if the specified type represents a generic marker type
 *
 * @param type Target type to check
 */
export const isGenericMarkerType = (
  type?: MarkerType,
): type is MarkerTypeGeneric => genericMarkerTypes.includes(type as any);

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
  options: MapFilterOptions,
) => hasListValue(marker.type, options.types);

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
 * Check if the specified type represents a need zone marker type
 *
 * @param type Target type to check
 */
export const isNeedZoneMarkerType = (
  type?: MarkerType,
): type is MarkerTypeNeedZone => needZoneMarkerTypes.includes(type as any);

/**
 * Update marker visibility based on filters and zoom
 *
 * @param filterOptions Filter options
 * @param zoomOptions Zoom options
 * @param zoomVisibilityMap Marker zoom visibility map
 * @param markerOptions List of marker options to process
 */
export const updateMarkerVisibility = (
  filterOptions: MapFilterOptions,
  zoomOptions: MapZoomOptions,
  zoomVisibilityMap: Map<MarkerType, number>,
  ...markerOptions: Array<Array<MarkerReference>>
) =>
  markerOptions
    .flat()
    .filter(options => !!options.ref.current)
    .forEach(options => {
      const { marker, ref } = options;
      const { zoomValue } = zoomOptions;

      // Always show debug markers
      if (marker.meta?.debug) {
        ref.current?.setVisible(true);
        return;
      }

      // Determine if marker should be visible with current filters
      const visibleWithFilter = isMarkerFiltered(marker, filterOptions);

      // Determine if marker matches the only filter type currently selected
      const visibleWithOnlyFilter =
        visibleWithFilter && filterOptions.types.length === 1;

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
