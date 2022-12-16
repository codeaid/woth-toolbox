import { useCallback, useMemo } from 'react';
import Slider from 'react-slider';
import { ButtonProps } from 'components/Button';
import { Label } from 'components/Label';
import { Select, SelectOption } from 'components/Select';
import { SidePanel } from 'components/SidePanel';
import { useTranslator } from 'hooks';
import { SettingsEditorProps } from './types';
import styles from './SettingsEditor.module.css';

export const SettingsEditor = (props: SettingsEditorProps) => {
  const { settings, visible = false, onChange, onClose } = props;

  // Retrieve application translator
  const translate = useTranslator();

  /**
   * Handle changes to animal marker size
   */
  const handleAnimalSizeChange = useCallback(
    (animalMarkerSize: number) => onChange({ animalMarkerSize }),
    [onChange],
  );

  /**
   * Handle changes to generic marker size
   */
  const handleGenericSizeChange = useCallback(
    (genericMarkerSize: number) => onChange({ genericMarkerSize }),
    [onChange],
  );

  /**
   * Handle changes to application language
   */
  const handleLanguageChange = useCallback(
    (locale?: string) => onChange({ locale }),
    [onChange],
  );

  /**
   * Handle resetting application settings
   */
  const handleReset = useCallback(() => onChange(), [onChange]);

  /**
   * Handle changes to animal need zone marker size
   */
  const handleZoneSizeChange = useCallback(
    (zoneMarkerSize: number) => onChange({ zoneMarkerSize }),
    [onChange],
  );

  /**
   * Render a value slider
   *
   * @param value Slider value
   * @param onChange Value change handler
   */
  const renderSlider = useCallback(
    (value: number, onChange: (value: number) => void) => (
      <Slider
        className={styles.SettingsEditorSlider}
        max={100}
        min={15}
        thumbClassName={styles.SettingsEditorSliderThumb}
        trackClassName={styles.SettingsEditorSliderTrack}
        value={value}
        onChange={onChange}
      />
    ),
    [],
  );

  // Side panel actions
  const actions = useMemo<Array<ButtonProps>>(
    () => [
      {
        children: translate('UI:RESET'),
        className: styles.SettingsEditorResetButton,
        onClick: handleReset,
      },
    ],
    [handleReset, translate],
  );

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
        { content: translate('UI:LANGUAGE_RU_RU'), value: 'ru' },
        { content: translate('UI:LANGUAGE_SK_SK'), value: 'sk' },
        { content: translate('UI:LANGUAGE_TR_TR'), value: 'tr' },
        { content: translate('UI:LANGUAGE_ZH_HANS'), value: 'zh' },
        { content: translate('UI:LANGUAGE_ZH_HANT'), value: 'zh-Hant' },
      ].sort((a, b) => a.content.localeCompare(b.content)),
    [translate],
  );

  // Rendered animal marker size slider
  const renderedAnimalMarkerSize = useMemo(
    () => renderSlider(settings.animalMarkerSize, handleAnimalSizeChange),
    [handleAnimalSizeChange, renderSlider, settings.animalMarkerSize],
  );

  // Rendered generic marker size slider
  const renderedGenericMarkerSize = useMemo(
    () => renderSlider(settings.genericMarkerSize, handleGenericSizeChange),
    [handleGenericSizeChange, renderSlider, settings.genericMarkerSize],
  );

  // Rendered animal need zone marker size slider
  const renderedZoneMarkerSize = useMemo(
    () => renderSlider(settings.zoneMarkerSize, handleZoneSizeChange),
    [renderSlider, settings.zoneMarkerSize, handleZoneSizeChange],
  );

  return (
    <SidePanel
      actions={actions}
      className={styles.SettingsEditorSidePanel}
      closeOnOutsideClick={true}
      title={translate('UI:SETTINGS')}
      visible={visible}
      onClose={onClose}
    >
      <div className={styles.SettingsEditor}>
        <Label>{translate('UI:LANGUAGE')}</Label>
        <Select
          options={languageOptions}
          value={settings.locale}
          onChange={handleLanguageChange}
        />

        <Label>
          {translate('TOOLBOX:SETTINGS_MARKER_SIZE_GENERIC')} (
          {settings.genericMarkerSize})
        </Label>
        {renderedGenericMarkerSize}

        <Label>
          {translate('TOOLBOX:SETTINGS_MARKER_SIZE_ANIMALS')} (
          {settings.animalMarkerSize})
        </Label>
        {renderedAnimalMarkerSize}

        <Label>
          {translate('TOOLBOX:SETTINGS_MARKER_SIZE_ZONES')} (
          {settings.zoneMarkerSize})
        </Label>
        {renderedZoneMarkerSize}
      </div>
    </SidePanel>
  );
};
