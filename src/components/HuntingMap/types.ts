import {
  AnimalEditorDataClearHandler,
  AnimalEditorDataReadHandler,
  AnimalEditorDataWriteHandler,
} from 'components/AnimalEditor';
import { MapLabelOptions } from 'types/cartography';
import {
  AnimalMarkerData,
  AnimalMarkerOptions,
  MarkerOptions,
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
  animalMarkerDataMap: Record<string, AnimalMarkerData>;
  animalMarkerSize?: number;
  animalMarkers: Array<AnimalMarkerOptions>;
  defaultZoom?: number;
  genericMarkerSize?: number;
  genericMarkers: Array<MarkerOptions>;
  imageHeight: number;
  imageSrc: string;
  imageWidth: number;
  labels?: Array<MapLabelOptions>;
  mapBoundary?: number;
  markerRangeMap?: Map<MarkerType, number>;
  zoomMax?: number;
  zoomMin?: number;
  zoomSpeed?: number;
  zoomStep?: number;
  onClick?: HuntingMapClickHandler;
  onEditorClear: AnimalEditorDataClearHandler;
  onEditorRead: AnimalEditorDataReadHandler;
  onEditorWrite: AnimalEditorDataWriteHandler;
}
