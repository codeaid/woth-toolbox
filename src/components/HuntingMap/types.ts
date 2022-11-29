import { AnimalMarkerOptions, MarkerOptions, MarkerType } from 'types/markers';

type HuntingMapClickHandler = (x: number, y: number) => void;
type HuntingMapFilterValueChangeHandler = (
  type: MarkerType,
  selected: boolean,
) => void;
type HuntingMapFilterChangeHandler = (selectedTypes: Array<MarkerType>) => void;
type HuntingMapResetHandler = () => void;
type HuntingMapZoomInHandler = () => void;
type HuntingMapZoomOutHandler = () => void;

export interface HuntingMapFilterProps {
  animalMarkers: Array<AnimalMarkerOptions>;
  genericMarkers: Array<MarkerOptions>;
  selectedTypes: Array<MarkerType>;
  onChange?: HuntingMapFilterChangeHandler;
}

export interface HuntingMapFilterItemProps {
  children: string;
  large?: boolean;
  selected: boolean;
  type: MarkerType;
  onToggle: HuntingMapFilterValueChangeHandler;
}

export interface HuntingMapOffsets {
  pageX: number;
  pageY: number;
  translateX: number;
  translateY: number;
}

export interface HuntingMapOptions {
  mapHeight: number;
  mapLeft: number;
  mapScale: number;
  mapTop: number;
  mapWidth: number;
}

export interface HuntingMapProps {
  animalMarkers: Array<AnimalMarkerOptions>;
  defaultScale?: number;
  genericMarkers: Array<MarkerOptions>;
  imageHeight: number;
  imageSrc: string;
  imageWidth: number;
  markerRangeMap?: Map<MarkerType, number>;
  maxMarkerSize?: number;
  maxScale?: number;
  minOverflow?: number;
  minScale?: number;
  scaleIncrement?: number;
  selectedFilterTypes?: Array<MarkerType>;
  onClick?: HuntingMapClickHandler;
  onFilterChange?: HuntingMapFilterChangeHandler;
}

export interface HuntingMapToolbarProps {
  onReset: HuntingMapResetHandler;
  onZoomIn: HuntingMapZoomInHandler;
  onZoomOut: HuntingMapZoomOutHandler;
}
