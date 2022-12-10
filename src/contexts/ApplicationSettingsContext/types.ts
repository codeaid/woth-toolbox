import { ApplicationSettings } from 'types/global';

type ApplicationSettingsContextValueChangeHandler = (
  settings?: ApplicationSettings,
) => void;

export interface ApplicationSettingsContextValue {
  settings: ApplicationSettings;
  onSettingsChange: ApplicationSettingsContextValueChangeHandler;
}
