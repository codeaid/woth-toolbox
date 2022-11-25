import { cabinMarkers, lodgeMarkers } from 'config/idaho';
import { MarkerOptions, MarkerType } from 'types/markers';

// Map size configuration
export const mapHeight = 4096;
export const mapWidth = 4096;

// List of generic markers to show on the Nex Perce map
export const genericMarkers: Array<MarkerOptions> = [
  cabinMarkers,
  lodgeMarkers,
].flat();

// Map of marker types and their maximum map scale visibility
export const markerVisibilityMap = new Map<MarkerType, number>([
  ['cabin', 0.25],
  ['lodge', 0],
]);
