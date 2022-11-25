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

export const echoMarkers = (
  [
    [0.7861328125, 0.729736328125],
    [0.625244140625, 0.8466796875],
    [0.28125, 0.740478515625],
    [0.12451171875, 0.645751953125],
    [0.423583984375, 0.256591796875],
    [0.60986328125, 0.428955078125],
    [0.320068359375, 0.425537109375],
  ] as Array<MarkerPosition>
).map(createMarkerPositionConverter('echo'));

export const lodgeMarkers = (
  [[0.66796875, 0.47509765625]] as Array<MarkerPosition>
).map(createMarkerPositionConverter('lodge'));
