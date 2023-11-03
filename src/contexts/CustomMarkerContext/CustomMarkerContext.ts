import { createContext } from 'react';
import type { CustomMarkerContextValue } from './types';

export const CustomMarkerContext = createContext<CustomMarkerContextValue>({
  markers: [],
  onClear: () => undefined,
  onCreate: () => undefined,
  onDelete: () => undefined,
  onReload: () => undefined,
});

export const { Provider: CustomMarkerProvider } = CustomMarkerContext;
