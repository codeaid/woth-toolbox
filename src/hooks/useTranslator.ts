import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import type { TranslationKey, Translator } from 'types/i18n';

/**
 * Create an instance of a function retrieving internationalized strings
 */
export const useTranslator = (): Translator => {
  const { formatMessage } = useIntl();

  return useCallback(
    (id: TranslationKey) => formatMessage({ id }),
    [formatMessage],
  );
};
