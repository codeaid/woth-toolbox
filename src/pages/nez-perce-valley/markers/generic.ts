import {
  cabinMarkers,
  campMarkers,
  echoMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  shootingRangeMarkers,
  viewMarkers,
} from 'config/idaho';
import { MarkerOptions } from 'types/markers';

// List of generic markers to show on the Nex Perce map
export const genericMarkers: Array<MarkerOptions> = [
  cabinMarkers,
  campMarkers,
  echoMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  shootingRangeMarkers,
  viewMarkers,
].flat();
