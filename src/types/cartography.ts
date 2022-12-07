import { ReactElement, RefObject } from 'react';
import { MarkerOptions } from 'types/markers';

export interface MapLabelOptions {
  coords: [number, number];
  habitat: string;
  name: string;
}

export interface MapMarkerOptions<
  TRef extends MapMarkerRef = MapMarkerRef,
  TMarkerOptions extends MarkerOptions = MarkerOptions,
> {
  element: ReactElement;
  marker: TMarkerOptions;
  ref: RefObject<TRef>;
}

export interface MapMarkerRef {
  setHidden: (hidden: boolean) => void;
  setVisible: (visible: boolean) => void;
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
