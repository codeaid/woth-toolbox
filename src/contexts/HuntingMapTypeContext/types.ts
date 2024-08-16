import type { MapId } from 'types/cartography';

export interface HuntingMapTypeContextValue {
  mapType?: MapId;
  onSetMapType: (mapType?: MapId) => void;
}
