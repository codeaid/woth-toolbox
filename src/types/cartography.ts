import { Point } from 'types/generic';
import { MarkerType } from 'types/markers';

export interface MapFilterOptions {
  types: Array<MarkerType>;
}

export interface MapLabelOptions {
  coords: Point;
  habitat: string;
  name: string;
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

export interface MapZoomOptions {
  zoomMax: number;
  zoomMin: number;
  zoomSpeed: number;
  zoomStep: number;
  zoomValue: number;
}
