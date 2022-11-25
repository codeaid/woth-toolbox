import {
  cabinMarkers,
  echoMarkers,
  lodgeMarkers,
  shootingRangeMarkers,
  viewMarkers,
} from 'config/idaho';
import { MarkerOptions, MarkerType } from 'types/markers';

// Map size configuration
export const mapHeight = 4096;
export const mapWidth = 4096;

// List of generic markers to show on the Nex Perce map
export const genericMarkers: Array<MarkerOptions> = [
  cabinMarkers,
  echoMarkers,
  lodgeMarkers,
  shootingRangeMarkers,
  viewMarkers,
].flat();

// Map of marker types and their maximum map scale visibility
export const markerVisibilityMap = new Map<MarkerType, number>([
  ['cabin', 0.25],
  ['echo', 0.35],
  ['lodge', 0],
  ['shooting range', 0.25],
  ['view', 0.35],
]);
