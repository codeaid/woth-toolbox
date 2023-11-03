import type { MapType } from 'types/cartography';

export interface HuntingMapTypeContextValue {
  mapType?: MapType;
  onSetMapType: (mapType?: MapType) => void;
}
