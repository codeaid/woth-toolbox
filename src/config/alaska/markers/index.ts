import { MarkerOptionsGeneric } from 'types/markers';
import {
  cabinMarkers,
  campMarkers,
  flowerMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  racingMarkers,
  viewMarkers,
} from './generic';

// List of generic markers to show on the Alaska map
export const genericMarkers: Array<MarkerOptionsGeneric> = [
  cabinMarkers,
  campMarkers,
  flowerMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  racingMarkers,
  viewMarkers,
].flat();
