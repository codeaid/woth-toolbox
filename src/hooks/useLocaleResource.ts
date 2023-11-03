import { useEffect, useState } from 'react';
import { useSettings } from 'hooks';
import { getLocaleMessagesAsync } from 'lib/i18n';
import type { TranslationResource } from 'types/i18n';

/**
 * Retrieve message resources associated with the specified locale
 */
export const useLocaleResource = () => {
  // Retrieve current application settings
  const { initialized, settings } = useSettings();

  // Locale and its resource messages
  const [messages, setMessages] = useState<TranslationResource>();

  // Load new message data on initial load and locale change
  useEffect(() => {
    // Ensure locale is present before fetching resources
    if (!initialized || !settings.locale) {
      return;
    }

    getLocaleMessagesAsync(settings.locale).then(setMessages);
  }, [initialized, settings.locale]);

  return messages;
};
