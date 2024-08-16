import { useMemo } from 'react';
import { defaultLocale } from 'config/i18n';
import { useSettings } from './useSettings';

/**
 * Retrieve current user's resource locale code
 */
export const useLocale = () => {
  // Retrieve current application settings
  const { onSettingsRead } = useSettings();

  return useMemo(
    () => onSettingsRead<'locale'>('locale', defaultLocale),
    [onSettingsRead],
  );
};
