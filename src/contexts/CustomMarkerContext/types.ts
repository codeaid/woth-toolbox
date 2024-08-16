import type { Point } from 'types/generic';
import type { CustomMarker, CustomMarkerType } from 'types/markers';

export interface CustomMarkerContextValue {
  markers: Array<CustomMarker>;
  onClear: (type: CustomMarkerType) => void;
  onCreate: (type: CustomMarkerType, coords: Point) => void;
  onDelete: (marker: CustomMarker) => void;
  onReload: () => void;
}
