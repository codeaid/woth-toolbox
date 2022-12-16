import { createContext } from 'react';
import { SettingsManagerContextValue } from './types';

export const SettingsManagerContext =
  createContext<SettingsManagerContextValue>({
    initialized: false,
    settings: undefined,
    onSettingsChange: () => undefined,
  });

export const { Provider: SettingsManagerProvider } = SettingsManagerContext;
