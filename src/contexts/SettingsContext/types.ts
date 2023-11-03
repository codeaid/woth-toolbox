import type { Settings, SettingsChangeHandler } from 'types/app';

export interface SettingsContextValue<TSettings extends Settings = Settings> {
  initialized: boolean;
  settings?: TSettings;
  onChange: SettingsChangeHandler;
  onReload: () => void;
}
