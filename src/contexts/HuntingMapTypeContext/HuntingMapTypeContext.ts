import { createContext } from 'react';
import { HuntingMapTypeContextValue } from './types';

export const HuntingMapTypeContext = createContext<HuntingMapTypeContextValue>({
  mapType: undefined,
  onSetMapType: () => undefined,
});

export const { Provider: HuntingMapTypeProvider } = HuntingMapTypeContext;
