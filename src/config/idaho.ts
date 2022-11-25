import { createMarkerPositionConverter } from 'lib/markers';
import { MarkerPosition } from 'types/markers';

export const lodgeMarkers = (
  [[0.66796875, 0.47509765625]] as Array<MarkerPosition>
).map(createMarkerPositionConverter('lodge'));
