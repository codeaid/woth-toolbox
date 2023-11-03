import type { Point } from 'types/generic';
import type { MarkerOptionsCustom, MarkerTypeCustom } from 'types/markers';

export interface CustomMarkerContextValue {
  markers: Array<MarkerOptionsCustom>;
  onClear: (type: MarkerTypeCustom) => void;
  onCreate: (type: MarkerTypeCustom, coords: Point) => void;
  onDelete: (marker: MarkerOptionsCustom) => void;
  onReload: () => void;
}
