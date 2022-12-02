import {
  cabinMarkers,
  campMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  photoMarkers,
  shootingRangeMarkers,
  viewMarkers,
} from 'config/transylvania';
import { GenericMarkerType, MarkerOptions } from 'types/markers';

// List of generic markers to show on the Nex Perce map
export const genericMarkers: Array<MarkerOptions<GenericMarkerType>> = [
  cabinMarkers,
  campMarkers,
  huntingStandMarkers,
  lodgeMarkers,
  photoMarkers,
  shootingRangeMarkers,
  viewMarkers,
].flat();
