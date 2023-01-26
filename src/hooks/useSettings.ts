import { useContext, useMemo } from 'react';
import { SettingsContext, SettingsContextValue } from 'contexts';
import { defaultSettings } from 'config/app';
import { getBrowserLocale } from 'lib/i18n';
import { Settings } from 'types/app';

/**
 * Retrieve current application settings
 */
export const useSettings = (): Required<
  SettingsContextValue<Required<Settings>>
> => {
  // Retrieve current application settings manager state
  const { settings, ...rest } = useContext(SettingsContext);

  // Ensure all settings keys are present
  const mergedSettings = useMemo<Required<Settings>>(
    () => ({
      ...defaultSettings,
      locale: settings?.locale ?? getBrowserLocale(),
      ...settings,
    }),
    [settings],
  );

  return { settings: mergedSettings, ...rest };
};
