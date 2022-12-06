import { ReactElement, RefObject } from 'react';
import { MarkerOptions } from 'types/markers';

export interface MapLabelOptions {
  coords: [number, number];
  habitat: string;
  name: string;
}

export interface MapMarkerOptions<TRef extends MapMarkerRef = MapMarkerRef> {
  element: ReactElement;
  marker: MarkerOptions;
  ref: RefObject<TRef>;
}

export interface MapMarkerRef {
  setHidden: (hidden: boolean) => void;
  setVisibleWithFilter: (visible: boolean) => void;
  setVisibleWithZoom: (visible: boolean) => void;
  updatePosition: (mapOptions: MapOptions) => void;
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

export type MapPoint = [number, number];

export interface MapZoomOptions {
  zoomMax: number;
  zoomMin: number;
  zoomSpeed: number;
  zoomStep: number;
  zoomValue: number;
}
