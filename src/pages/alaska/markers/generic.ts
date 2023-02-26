import {
  cabinMarkers,
  campMarkers,
  flowerMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  racingMarkers,
  viewMarkers,
} from 'config/alaska';
import { MarkerOptionsGeneric } from 'types/markers';

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
