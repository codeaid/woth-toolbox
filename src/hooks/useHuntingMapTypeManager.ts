'use client';

import { useState } from 'react';
import type { HuntingMapTypeContextValue } from 'contexts';
import type { MapId } from 'types/cartography';

export const useHuntingMapTypeManager = (): HuntingMapTypeContextValue => {
  const [mapType, setMapType] = useState<MapId>();

  return {
    mapType,
    onSetMapType: setMapType,
  };
};
