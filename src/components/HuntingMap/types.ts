import {
  AnimalEditorDataClearHandler,
  AnimalEditorDataReadHandler,
  AnimalEditorDataWriteHandler,
} from 'components/AnimalEditor';
import { MapLabelOptions } from 'types/cartography';
import {
  MarkerOptionsAnimal,
  MarkerOptionsGeneric,
  MarkerStorageRecordAnimal,
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
  animalMarkerRecords: Record<string, MarkerStorageRecordAnimal>;
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
  zoomMarkerMap?: Map<MarkerType, number>;
  zoomMax?: number;
  zoomMin?: number;
  zoomSpeed?: number;
  zoomStep?: number;
  onClick?: HuntingMapClickHandler;
  onEditorClear: AnimalEditorDataClearHandler;
  onEditorRead: AnimalEditorDataReadHandler;
  onEditorWrite: AnimalEditorDataWriteHandler;
}
