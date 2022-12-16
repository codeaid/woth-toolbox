import { Settings, SettingsChangeHandler } from 'types/app';

export interface SettingsManagerContextValue<
  TSettings extends Settings = Settings,
> {
  initialized: boolean;
  settings?: TSettings;
  onSettingsChange: SettingsChangeHandler;
}
