'use client';

import process from 'process';
import { useCallback } from 'react';
import defaultMessages from 'locales';
import type { TranslationKey, Translator } from 'types/i18n';
import { useLocaleResource } from './useLocaleResource';

/**
 * Create an instance of a function retrieving internationalized strings
 */
export const useTranslator = (): Translator => {
  // const { formatMessage } = useIntl();
  const messages = useLocaleResource() ?? defaultMessages;

  return useCallback(
    (id: TranslationKey) => {
      if (!messages[id] && process.env.NODE_ENV === 'development') {
        throw new Error(`Translation not found for "${id}"`);
      }

      return messages[id];
    },
    [messages],
  );
};
