import {
  cabinMarkers,
  campMarkers,
  echoMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  shootingRangeMarkers,
  viewMarkers,
} from 'config/idaho';
import { MarkerOptionsGeneric } from 'types/markers';

// List of generic markers to show on the Nex Perce map
export const genericMarkers: Array<MarkerOptionsGeneric> = [
  cabinMarkers,
  campMarkers,
  echoMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  shootingRangeMarkers,
  viewMarkers,
].flat();
