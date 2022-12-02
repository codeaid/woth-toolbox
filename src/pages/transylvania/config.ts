import { HuntingMapLabelOptions } from 'components/HuntingMapLabel';
import { MarkerType } from 'types/markers';

// Map size configuration
export const mapHeight = 4096;
export const mapWidth = 4096;

// List of label to show on the map
export const mapLabels: Array<HuntingMapLabelOptions> = [];

// Map of marker types and their maximum map scale visibility
export const markerVisibilityMap = new Map<MarkerType, number>([
  ['animal:golden jackal', 0.65],
  ['cabin', 0.25],
  ['camp', 0.25],
  ['hunting stand', 0.45],
  ['lodge', 0],
  ['photo', 0.35],
  ['shooting range', 0.25],
  ['view', 0.35],
  ['zone:drink', 0.65],
  ['zone:eat', 0.65],
  ['zone:sleep', 0.65],
]);
