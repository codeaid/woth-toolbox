'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'hooks';
import { getLocaleMessagesAsync } from 'lib/i18n';
import type { TranslationResource } from 'types/i18n';

/**
 * Retrieve message resources associated with the specified locale
 */
export const useLocaleResource = () => {
  // Retrieve current application locale
  const locale = useLocale();

  // Locale and its resource messages
  const [messages, setMessages] = useState<TranslationResource>();

  // Load new message data on initial load and locale change
  useEffect(() => {
    getLocaleMessagesAsync(locale).then(setMessages);
  }, [locale]);

  return messages;
};
