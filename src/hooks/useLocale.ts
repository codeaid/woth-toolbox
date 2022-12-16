import { useMemo } from 'react';
import { useSettings } from './useSettings';

/**
 * Retrieve current user's resource locale code
 */
export const useLocale = () => {
  // Retrieve current application settings
  const { settings } = useSettings();

  return useMemo(() => settings.locale, [settings.locale]);
};
