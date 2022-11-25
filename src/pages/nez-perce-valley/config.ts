import { MarkerType } from 'types/markers';

// Map size configuration
export const mapHeight = 4096;
export const mapWidth = 4096;

// Map of marker types and their maximum map scale visibility
export const markerVisibilityMap = new Map<MarkerType, number>([
  ['cabin', 0.25],
  ['camp', 0.25],
  ['echo', 0.35],
  ['hunting stand', 0.45],
  ['lodge', 0],
  ['shooting range', 0.25],
  ['view', 0.35],
]);
