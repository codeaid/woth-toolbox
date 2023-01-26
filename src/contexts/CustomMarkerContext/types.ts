import { Point } from 'types/generic';
import { MarkerOptionsCustom, MarkerTypeCustom } from 'types/markers';
import { MapType } from 'types/cartography';

export interface CustomMarkerContextValue {
  markers: Array<MarkerOptionsCustom>;
  onClear: (type: MarkerTypeCustom) => void;
  onCreate: (type: MarkerTypeCustom, coords: Point) => void;
  onDelete: (marker: MarkerOptionsCustom) => void;
  onReload: () => void;
  onSetCurrentMap: (type?: MapType) => void;
}
