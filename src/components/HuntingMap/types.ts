import { MapLabelOptions } from 'types/cartography';
import {
  MarkerOptionsAnimal,
  MarkerOptionsGeneric,
  MarkerType,
} from 'types/markers';

type HuntingMapClickHandler = (x: number, y: number) => void;

export interface HuntingMapDragOptions {
  mapLeft: number;
  mapTop: number;
  pageX: number;
  pageY: number;
}

export interface HuntingMapProps {
  animalMarkers: Array<MarkerOptionsAnimal>;
  defaultZoomValue?: number;
  genericMarkers: Array<MarkerOptionsGeneric>;
  imageHeight: number;
  imageSrc: string;
  imageWidth: number;
  labels?: Array<MapLabelOptions>;
  mapBoundary?: number;
  markerSizeAnimal?: number;
  markerSizeGeneric?: number;
  markerSizeZone?: number;
  markerTrophyRating?: boolean;
  zoomLabelMax?: number;
  zoomLabelMin?: number;
  zoomMarkerMap?: Map<MarkerType, number>;
  zoomMax?: number;
  zoomMin?: number;
  zoomSpeed?: number;
  zoomStep?: number;
  onClick?: HuntingMapClickHandler;
}
