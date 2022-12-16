import { useContext, useMemo } from 'react';
import { SettingsManagerContext, SettingsManagerContextValue } from 'contexts';
import { defaultSettings } from 'config/app';
import { getBrowserLocale } from 'lib/i18n';
import { Settings } from 'types/app';

/**
 * Retrieve current application settings
 */
export const useSettings = () => {
  // Retrieve current application settings manager state
  const {
    initialized,
    settings: storageSettings,
    onSettingsChange,
  } = useContext(SettingsManagerContext);

  // Ensure all settings keys are present
  const settings = useMemo<Required<Settings>>(
    () => ({
      ...defaultSettings,
      locale: storageSettings?.locale ?? getBrowserLocale(),
      ...storageSettings,
    }),
    [storageSettings],
  );

  return useMemo<Required<SettingsManagerContextValue<Required<Settings>>>>(
    () => ({
      initialized,
      settings,
      onSettingsChange,
    }),
    [initialized, onSettingsChange, settings],
  );
};
