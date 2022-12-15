import { useEffect, useState } from 'react';
import { getLocaleMessagesAsync } from 'lib/i18n';
import { TranslationResource } from 'types/i18n';

/**
 * Retrieve message resources associated with the specified locale
 *
 * @param locale Target locale
 */
export const useLocaleResource = (locale: string) => {
  // Locale and its resource messages
  const [messages, setMessages] = useState<TranslationResource>();

  // Load new message data on initial load and locale change
  useEffect(() => {
    getLocaleMessagesAsync(locale).then(setMessages);
  }, [locale]);

  return messages;
};
