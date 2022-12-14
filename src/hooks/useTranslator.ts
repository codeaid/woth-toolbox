import { useTranslation } from 'next-i18next';
import { Translator } from 'types/i18n';

/**
 * Create an instance of application translator
 */
export const useTranslator = () => {
  // Retrieve original translator function
  const { t } = useTranslation<'woth' | 'toolbox'>();

  return t as Translator;
};
