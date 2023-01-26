import {
  AnimalEditorDataClearHandler,
  AnimalEditorDataReadHandler,
  AnimalEditorDataWriteHandler,
} from 'components/AnimalEditor';
import { MapLabelOptions } from 'types/cartography';
import { Point } from 'types/generic';
import {
  MarkerDataAnimal,
  MarkerOptionsAnimal,
  MarkerOptionsCustom,
  MarkerOptionsGeneric,
  MarkerType,
  MarkerTypeCustom,
} from 'types/markers';

type HuntingMapClickHandler = (x: number, y: number) => void;
type HuntingMapCustomMarkerCreateHandler = (
  type: MarkerTypeCustom,
  coords: Point,
) => void;
type HuntingMapCustomMarkerRemoveHandler = (
  marker: MarkerOptionsCustom,
) => void;
type HuntingMapCustomMarkersClearHandler = (type?: MarkerTypeCustom) => void;

export interface HuntingMapDragOptions {
  mapLeft: number;
  mapTop: number;
  pageX: number;
  pageY: number;
}

export interface HuntingMapProps {
  animalMarkerRecords: Record<string, MarkerDataAnimal>;
  animalMarkers: Array<MarkerOptionsAnimal>;
  customMarkers?: Array<MarkerOptionsCustom>;
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
  zoomLabelMax?: number;
  zoomLabelMin?: number;
  zoomMarkerMap?: Map<MarkerType, number>;
  zoomMax?: number;
  zoomMin?: number;
  zoomSpeed?: number;
  zoomStep?: number;
  onClick?: HuntingMapClickHandler;
  onCustomMarkerCreate?: HuntingMapCustomMarkerCreateHandler;
  onCustomMarkerRemove?: HuntingMapCustomMarkerRemoveHandler;
  onCustomMarkersClear?: HuntingMapCustomMarkersClearHandler;
  onEditorClear: AnimalEditorDataClearHandler;
  onEditorRead: AnimalEditorDataReadHandler;
  onEditorWrite: AnimalEditorDataWriteHandler;
}
