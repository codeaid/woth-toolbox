import type { MapLabelOptions } from 'types/cartography';
import type { Point } from 'types/generic';
import type {
  AnimalMarkerRecord,
  AnimalMarker,
  GenericMarker,
  MarkerType,
  CustomMarker,
  CustomMarkerType,
} from 'types/markers';

type HuntingMapClickHandler = (x: number, y: number) => void;
type HuntingMapEditAnimalHandler = (marker?: AnimalMarker) => void;

export interface HuntingMapDragOptions {
  mapLeft: number;
  mapTop: number;
  pageX: number;
  pageY: number;
}

export interface HuntingMapProps {
  animalMarkers: Array<AnimalMarker>;
  animalRecordMap: Readonly<Record<string, AnimalMarkerRecord>>;
  customMarkers: Array<CustomMarker>;
  defaultZoomValue?: number;
  editedAnimal?: AnimalMarker;
  genericMarkers: Array<GenericMarker>;
  imageHeight?: number;
  imageScale?: number;
  imageSrc: string;
  imageWidth?: number;
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
  onClearTrackingMarkers: () => void;
  onCreateCustomMarker: (type: CustomMarkerType, coords: Point) => void;
  onDeleteCustomMarker: (marker: CustomMarker) => void;
  onEditAnimalMarker: HuntingMapEditAnimalHandler;
}
