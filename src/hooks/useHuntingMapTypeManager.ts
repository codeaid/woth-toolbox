import { useState } from 'react';
import type { HuntingMapTypeContextValue } from 'contexts';
import type { MapType } from 'types/cartography';

export const useHuntingMapTypeManager = (): HuntingMapTypeContextValue => {
  const [mapType, setMapType] = useState<MapType>();

  return {
    mapType,
    onSetMapType: setMapType,
  };
};
