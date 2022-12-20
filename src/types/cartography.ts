import { Point } from 'types/generic';
import { TranslationKey } from 'types/i18n';
import { MarkerType } from 'types/markers';

export interface MapFilterOptions {
  exploration: boolean;
  labels: boolean;
  tracking: boolean;
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

export type MapType = 'idaho' | 'transylvania';

export interface MapZoomOptions {
  zoomMax: number;
  zoomMin: number;
  zoomSpeed: number;
  zoomStep: number;
  zoomValue: number;
}
