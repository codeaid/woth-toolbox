import { MarkerType } from 'types/markers';

// Map size configuration
export const mapHeight = 4096;
export const mapWidth = 4096;

// Map of marker types and their maximum map scale visibility
export const markerVisibilityMap = new Map<MarkerType, number>([
  ['animal:american badger', 0.65],
  ['animal:american black bear', 0.65],
  ['animal:bighorn sheep', 0.65],
  ['animal:gray wolf', 0.65],
  ['animal:moose', 0.65],
  ['animal:mountain goat', 0.65],
  ['animal:pheasant', 0.65],
  ['animal:ross goose', 0.65],
  ['cabin', 0.25],
  ['camp', 0.25],
  ['echo', 0.35],
  ['hunting stand', 0.45],
  ['lodge', 0],
  ['shooting range', 0.25],
  ['view', 0.35],
  ['zone:drink', 0.65],
  ['zone:eat', 0.65],
  ['zone:sleep', 0.65],
]);
