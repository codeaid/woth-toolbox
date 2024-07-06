'use client';

import { createContext } from 'react';
import type { AnimalMarkerContextValue } from './types';

export const AnimalMarkerContext = createContext<AnimalMarkerContextValue>({
  markers: {},
  onCreateData: () => undefined,
  onDeleteData: () => undefined,
  onReadData: () => undefined,
  onReload: () => undefined,
});

export const AnimalMarkerProvider = AnimalMarkerContext.Provider;
