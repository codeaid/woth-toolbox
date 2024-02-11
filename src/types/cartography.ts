import type { Point } from 'types/generic';
import type { TranslationKey } from 'types/i18n';
import type { MarkerType } from 'types/markers';

export interface MapFilterOptions {
  hideUnedited: boolean;
  showExplorationMarkers: boolean;
  showLabels: boolean;
  showTrackingMarkers: boolean;
  types: Array<MarkerType>;
}

export interface MapLabelOptions {
  coords: Point;
  habitat: TranslationKey;
  name: TranslationKey;
}

export interface MapOptions {
  containerHeight: number;
  containerWidth: number;
  imageHeight: number;
  imageWidth: number;
  mapBoundary: number;
  mapHeight: number;
  mapLeft: number;
  mapTop: number;
  mapWidth: number;
}

export type MapType =
  | 'africa'
  | 'alaska'
  | 'idaho'
  | 'new-zealand'
  | 'transylvania';

export interface MapZoomOptions {
  zoomMax: number;
  zoomMin: number;
  zoomSpeed: number;
  zoomStep: number;
  zoomValue: number;
}
