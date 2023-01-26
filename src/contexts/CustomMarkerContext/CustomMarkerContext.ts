import { createContext } from 'react';
import { CustomMarkerContextValue } from './types';

export const CustomMarkerContext = createContext<CustomMarkerContextValue>({
  markers: [],
  onClear: () => undefined,
  onCreate: () => undefined,
  onDelete: () => undefined,
  onReload: () => undefined,
  onSetCurrentMap: () => undefined,
});

export const { Provider: CustomMarkerProvider } = CustomMarkerContext;
