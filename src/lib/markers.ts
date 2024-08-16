import sha1 from 'sha1';
import {
  animalMarkerTypes,
  customMarkerTypes,
  genericMarkerTypes,
  needZoneMarkerTypes,
} from 'config/markers';
import { hasListValue, partitionArray } from 'lib/utils';
import type { AnimalType } from 'types/animals';
import type {
  MapFilterOptions,
  MapLabelOptions,
  MapZoomOptions,
} from 'types/cartography';
import type { Point } from 'types/generic';
import type {
  JsonAnimalDocument,
  JsonAnimalDocumentRecord,
  JsonLabelDocument,
  JsonMarkerDocument,
} from 'types/json';
import type {
  AnimalMarker,
  AnimalMarkerRecord,
  AnimalMarkerType,
  CustomMarkerType,
  DrinkZoneMarker,
  EatZoneMarker,
  GenericMarker,
  GenericMarkerType,
  Marker,
  MarkerReference,
  MarkerType,
  NeedZoneMarker,
  NeedZoneMarkerType,
  SleepZoneMarker,
} from 'types/markers';

/**
 * Generate a hash from the specified coordinates
 *
 * @param x Marker's X offset
 * @param y Marker's Y offset
 */
export const getCoordinateHash = ([x, y]: Point) =>
  sha1(`${x}:${y}`).substring(0, 8);

/**
 * Generate a hash from the specified coordinates
 *
 * @param x Marker's X offset
 * @param y Marker's Y offset
 * @param multiplier Base multiplier
 */
export const getCoordinateRatio = (
  [x, y]: Point,
  multiplier: number,
): [number, number] => [Math.round(x * multiplier), Math.round(y * multiplier)];

/**
 * Get marker color class based on its type
 *
 * @param marker Marker object
 * @param genericClass Generic marker CSS class
 * @param landmarkClass Landmark marker CSS class (cabin, camp, shooting range)
 * @param lodgeClass Lodge marker CSS class
 */
export const getGenericMarkerColorClass = (
  marker: GenericMarker,
  genericClass: string,
  landmarkClass: string,
  lodgeClass: string,
) => {
  switch (marker.type) {
    case 'cabin':
    case 'camp':
    case 'parking':
    case 'race':
    case 'shooting range':
      return landmarkClass;
    case 'lodge':
      return lodgeClass;
    default:
      return genericClass;
  }
};

/**
 * Get list of marker types from the specified list of objects
 *
 * @param markers Source list of markers
 */
export const getMarkerOptionTypes = (...markers: Array<Marker>) =>
  Array.from(
    markers.reduce<Set<MarkerType>>(
      (acc, current) => acc.add(current.type),
      new Set(),
    ),
  );

/**
 * Check if both markers have the same coordinates
 *
 * @param marker Source marker
 * @param coords Target coordinates
 */
export const hasSameCoordinates = (marker: Marker, coords: Point) =>
  marker.coords[0] === coords[0] && marker.coords[1] === coords[1];

/**
 * Check if the specified type represents an animal marker type
 *
 * @param type Target type to check
 */
export const isAnimalMarkerType = (
  type?: MarkerType,
): type is AnimalMarkerType => animalMarkerTypes.includes(type as any);

/**
 * Check if the specified type represents a custom marker type
 *
 * @param type Target type to check
 */
export const isCustomMarkerType = (
  type?: MarkerType,
): type is CustomMarkerType => customMarkerTypes.includes(type as any);

/**
 * Check if the specified type represents a generic marker type
 *
 * @param type Target type to check
 */
export const isGenericMarkerType = (
  type?: MarkerType,
): type is GenericMarkerType => genericMarkerTypes.includes(type as any);

/**
 * Check if a marker is included in the specified filter
 *
 * @param marker Marker to validate
 * @param options Target filter options
 */
const isMarkerFiltered = (marker: Marker, options: MapFilterOptions) =>
  hasListValue(marker.type, options.types);

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

/**
 * Check if the specified type represents a need zone marker type
 *
 * @param type Target type to check
 */
export const isNeedZoneMarkerType = (
  type?: MarkerType,
): type is NeedZoneMarkerType => needZoneMarkerTypes.includes(type as any);

/**
 * Create a list of animal markers from the specified JSON document contents
 *
 * @param doc Source JSON document
 */
export const buildAnimalMarkers = (
  doc: JsonAnimalDocument,
): Array<AnimalMarker> =>
  (Object.entries(doc) as Array<[AnimalType, Array<JsonAnimalDocumentRecord>]>)
    .map(([animalType, animalData]) =>
      animalData.map<AnimalMarker>(values => {
        // Extract animal marker identifier and list of coordinates associated with it.
        const [
          id,
          animalCoordsX,
          animalCoordsY,
          drinkCoords,
          eatCoords,
          sleepCoords,
        ] = values;

        return {
          id,
          coords: [animalCoordsX, animalCoordsY] as Point,
          drink: buildNeedZoneMarker(
            partitionArray(drinkCoords, 2),
            'zone:drink',
          ) as Array<DrinkZoneMarker>,
          eat: buildNeedZoneMarker(
            partitionArray(eatCoords, 2),
            'zone:eat',
          ) as Array<EatZoneMarker>,
          sleep: buildNeedZoneMarker(
            partitionArray(sleepCoords, 2),
            'zone:sleep',
          ) as Array<SleepZoneMarker>,
          type: animalType,
        };
      }),
    )
    .flat();

/**
 * Create a list of generic markers from the specified JSON document contents
 *
 * @param doc Source JSON document
 */
export const buildGenericMarkers = (doc: JsonMarkerDocument) =>
  doc.map<GenericMarker>(([type, ...coords]) => ({
    coords,
    type,
    id: getCoordinateHash(coords as Point),
  }));

/**
 * Create a list of labels from the specified JSON document contents
 *
 * @param doc Source JSON document
 */
export const buildLabelMarkers = (doc: JsonLabelDocument) =>
  doc.map<MapLabelOptions>(([name, habitat, ...coords]) => ({
    coords,
    habitat,
    name,
  }));

/**
 * Create a need zone marker from the specified coordinates and type
 *
 * @param coords Marker coordinates
 * @param type Need zone type
 */
const buildNeedZoneMarker = (
  coords: Array<Array<number>>,
  type: NeedZoneMarkerType,
): Array<NeedZoneMarker> =>
  coords.map(point => ({
    id: getCoordinateHash(point as Point),
    type,
    coords: point as Point,
  }));

/**
 * Check if the specified marker data object does not contain any values
 *
 * @param data Animal data object to validate
 */
export const isEmptyAnimalMarker = (data?: AnimalMarkerRecord) =>
  !data ||
  ((!data.color || data.color === '#ffffff') &&
    (!data.comment || data.comment.trim() === '') &&
    (!data.group || !data.group.length));

/**
 * Update marker visibility based on filters and zoom
 *
 * @param filterOptions Filter options
 * @param zoomOptions Zoom options
 * @param zoomVisibilityMap Marker zoom visibility map
 * @param animalRecordMap Animal marker data records
 * @param markerOptions List of marker options to process
 */
export const updateMarkerVisibility = (
  filterOptions: MapFilterOptions,
  zoomOptions: MapZoomOptions,
  zoomVisibilityMap: Map<MarkerType, number>,
  animalRecordMap: Record<string, AnimalMarkerRecord>,
  ...markerOptions: Array<Array<MarkerReference>>
) =>
  markerOptions
    .flat()
    .filter(options => !!options.ref.current)
    .forEach(options => {
      const { marker, ref } = options;
      const { zoomValue } = zoomOptions;

      // Determine if marker should be visible with current filters
      const visibleWithFilter = isMarkerFiltered(marker, filterOptions);

      // Only show animal markers containing custom data
      if (filterOptions.hideUnedited && isAnimalMarkerType(marker.type)) {
        ref.current?.setVisible(
          visibleWithFilter && marker.id in animalRecordMap,
        );
        return;
      }

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
