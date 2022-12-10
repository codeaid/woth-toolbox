import { createContext } from 'react';
import { defaultAppSettings } from 'config/general';
import { ApplicationSettingsContextValue } from './types';

export const ApplicationSettingsContext =
  createContext<ApplicationSettingsContextValue>({
    settings: defaultAppSettings,
    onSettingsChange: () => undefined,
  });

export const { Provider: ApplicationSettingsProvider } =
  ApplicationSettingsContext;
