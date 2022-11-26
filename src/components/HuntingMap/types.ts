import { AnimalMarkerOptions, MarkerOptions, MarkerType } from 'types/markers';

type HuntingMapClickHandler = (x: number, y: number) => void;
type HuntingMapMarkerClickHandler = (marker: MarkerOptions) => void;
type HuntingMapResetHandler = () => void;
type HuntingMapZoomInHandler = () => void;
type HuntingMapZoomOutHandler = () => void;

export interface HuntingMapOffsets {
  pageX: number;
  pageY: number;
  translateX: number;
  translateY: number;
}

export interface HuntingMapMarkerAnimalProps {
  mapScale: number;
  marker: AnimalMarkerOptions;
  markerFilter?: Array<MarkerType>;
  markerVisibilityMap: Map<MarkerType, number>;
  maxMarkerSize: number;
}

export interface HuntingMapMarkerGenericProps {
  className?: string;
  highlighted?: boolean;
  mapScale: number;
  marker: MarkerOptions;
  markerFilter?: Array<MarkerType>;
  markerVisibilityMap: Map<MarkerType, number>;
  maxMarkerSize: number;
  visible?: boolean;
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
  animalMarkers?: Array<AnimalMarkerOptions>;
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

export interface HuntingMapToolbarProps {
  onReset: HuntingMapResetHandler;
  onZoomIn: HuntingMapZoomInHandler;
  onZoomOut: HuntingMapZoomOutHandler;
}
