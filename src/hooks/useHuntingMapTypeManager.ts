import { useState } from 'react';
import { HuntingMapTypeContextValue } from 'contexts';
import { MapType } from 'types/cartography';

export const useHuntingMapTypeManager = (): HuntingMapTypeContextValue => {
  const [mapType, setMapType] = useState<MapType>();

  return {
    mapType,
    onSetMapType: setMapType,
  };
};
