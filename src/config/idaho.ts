import { createMarkerPositionConverter } from 'lib/markers';
import { MarkerPosition } from 'types/markers';

export const cabinMarkers = (
  [
    [0.7939453125, 0.242919921875],
    [0.248046875, 0.3203125],
    [0.2060546875, 0.685546875],
    [0.7568359375, 0.8310546875],
  ] as Array<MarkerPosition>
).map(createMarkerPositionConverter('cabin'));

export const lodgeMarkers = (
  [[0.66796875, 0.47509765625]] as Array<MarkerPosition>
).map(createMarkerPositionConverter('lodge'));
