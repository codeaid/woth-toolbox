import { MarkerOptions, MarkerType } from 'types/markers';

type HuntingMapClickHandler = (x: number, y: number) => void;
type HuntingMapMarkerClickHandler = (marker: MarkerOptions) => void;

export interface HuntingMapOffsets {
  pageX: number;
  pageY: number;
  translateX: number;
  translateY: number;
}

export interface HuntingMapMarkerGenericProps {
  className?: string;
  mapScale: number;
  marker: MarkerOptions;
  markerVisibilityMap?: Map<MarkerType, number>;
  maxMarkerSize: number;
  onClick?: HuntingMapMarkerClickHandler;
}

export interface HuntingMapOptions {
  mapHeight: number;
  mapLeft: number;
  mapScale: number;
  mapTop: number;
  mapWidth: number;
}

export interface HuntingMapProps {
  defaultScale?: number;
  genericMarkers?: Array<MarkerOptions>;
  imageHeight: number;
  imageSrc: string;
  imageWidth: number;
  markerFilter?: Array<MarkerType>;
  markerVisibilityMap?: Map<MarkerType, number>;
  maxMarkerSize?: number;
  maxScale?: number;
  minOverflow?: number;
  minScale?: number;
  scaleIncrement?: number;
  showButtons?: boolean;
  onClick?: HuntingMapClickHandler;
}
