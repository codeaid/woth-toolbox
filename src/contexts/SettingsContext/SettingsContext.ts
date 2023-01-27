import { createContext } from 'react';
import { SettingsContextValue } from './types';

export const SettingsContext = createContext<SettingsContextValue>({
  initialized: false,
  settings: undefined,
  onChange: () => undefined,
  onReload: () => undefined,
});

export const { Provider: SettingsProvider } = SettingsContext;
