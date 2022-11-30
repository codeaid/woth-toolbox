import { AnimalMarkerOptions, MarkerType } from 'types/markers';

export interface HuntingMapAnimalProps {
  mapScale: number;
  marker: AnimalMarkerOptions;
  markerRangeMap: Map<MarkerType, number>;
  maxMarkerSize: number;
  visible?: boolean;
}
