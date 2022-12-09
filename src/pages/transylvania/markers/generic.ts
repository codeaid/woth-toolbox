import {
  cabinMarkers,
  campMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  photoMarkers,
  shootingRangeMarkers,
  viewMarkers,
} from 'config/transylvania';
import { MarkerOptionsGeneric } from 'types/markers';

// List of generic markers to show on the Nex Perce map
export const genericMarkers: Array<MarkerOptionsGeneric> = [
  cabinMarkers,
  campMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  photoMarkers,
  shootingRangeMarkers,
  viewMarkers,
].flat();
