import { getUserLocales } from 'get-user-locale';
import { useMemo } from 'react';
import { defaultLocale, languageDirectoryMap } from 'config/i18n';

/**
 * Retrieve current user's resource locale code
 */
export const useLocale = () =>
  useMemo(() => {
    // Get detected locale code
    const locales = getUserLocales();

    // Iterate through all user locales and attempt to find one that has resources
    for (const locale of locales) {
      // Check if detected locale has a direct map to a resource directory
      if (languageDirectoryMap.has(locale)) {
        return locale;
      }

      // Direct map does not exist, attempt to detect the main language code
      const language = new Intl.Locale(locale).language;

      // Check if locale's language has a resource map and use it if it does
      if (languageDirectoryMap.has(language)) {
        return language;
      }
    }

    // None of the user locales is supported, use default locale
    return defaultLocale;
  }, []);
