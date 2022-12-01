import {
  HuntingMapFilterChangeHandler,
  HuntingMapFilterOptions,
} from 'components/HuntingMapFilter';
import { HuntingMapLabelOptions } from 'components/HuntingMapLabel';
import {
  AnimalMarkerData,
  AnimalMarkerOptions,
  MarkerOptions,
  MarkerType,
} from 'types/markers';

type HuntingMapClickHandler = (x: number, y: number) => void;
type HuntingMapMarkerDataRefreshHandler = (
  key: string,
  data?: AnimalMarkerData,
) => void;

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
  animalMarkerDataMap: Record<string, AnimalMarkerData>;
  defaultScale?: number;
  filterOptions: HuntingMapFilterOptions;
  genericMarkers: Array<MarkerOptions>;
  imageHeight: number;
  imageSrc: string;
  imageWidth: number;
  labels?: Array<HuntingMapLabelOptions>;
  markerRangeMap?: Map<MarkerType, number>;
  maxMarkerSize?: number;
  maxScale?: number;
  minOverflow?: number;
  minScale?: number;
  scaleIncrement?: number;
  onClick?: HuntingMapClickHandler;
  onFilterChange?: HuntingMapFilterChangeHandler;
  onMarkerDataChange: HuntingMapMarkerDataRefreshHandler;
}
