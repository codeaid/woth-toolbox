import { useCallback, useMemo } from 'react';
import { Select } from 'components/Select';
import type { SelectOption } from 'components/Select';
import { useTranslator } from 'hooks';
import type { SettingsEditorLanguageProps } from './types';

export const SettingsEditorLanguage = (props: SettingsEditorLanguageProps) => {
  const { settings, onChange } = props;

  // Retrieve application translator
  const translate = useTranslator();

  // List of language options
  const languageOptions = useMemo<Array<SelectOption<string>>>(
    () =>
      [
        { content: translate('UI:LANGUAGE_CS_CZ'), value: 'cs' },
        { content: translate('UI:LANGUAGE_DE_DE'), value: 'de' },
        { content: translate('UI:LANGUAGE_EN_US'), value: 'en' },
        { content: translate('UI:LANGUAGE_ES_ES'), value: 'es' },
        { content: translate('UI:LANGUAGE_FR_FR'), value: 'fr' },
        { content: translate('UI:LANGUAGE_HI_IN'), value: 'hi' },
        { content: translate('UI:LANGUAGE_ID_ID'), value: 'id' },
        { content: translate('UI:LANGUAGE_IT_IT'), value: 'it' },
        { content: translate('UI:LANGUAGE_JA_JP'), value: 'ja' },
        { content: translate('UI:LANGUAGE_PL_PL'), value: 'pl' },
        { content: translate('TOOLBOX:LANGUAGE_PT_BR'), value: 'pt-BR' },
        { content: translate('UI:LANGUAGE_RU_RU'), value: 'ru' },
        { content: translate('UI:LANGUAGE_SK_SK'), value: 'sk' },
        { content: translate('UI:LANGUAGE_TR_TR'), value: 'tr' },
        { content: translate('UI:LANGUAGE_ZH_HANS'), value: 'zh' },
        { content: translate('UI:LANGUAGE_ZH_HANT'), value: 'zh-Hant' },
        { content: translate('TOOLBOX:LANGUAGE_NL_NL'), value: 'nl' },
      ].sort((a, b) => a.content.localeCompare(b.content)),
    [translate],
  );

  /**
   * Handle changes to application language
   */
  const handleLanguageChange = useCallback(
    (locale?: string) => onChange({ locale }),
    [onChange],
  );

  return (
    <Select
      options={languageOptions}
      value={settings.locale}
      onChange={handleLanguageChange}
    />
  );
};
