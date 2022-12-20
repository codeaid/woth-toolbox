import { useCallback, useMemo } from 'react';
import Slider from 'react-slider';
import { ButtonProps } from 'components/Button';
import { Label } from 'components/Label';
import { SidePanel } from 'components/SidePanel';
import { useTranslator } from 'hooks';
import { SettingsEditorLanguage } from './SettingsEditorLanguage';
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
        <SettingsEditorLanguage settings={settings} onChange={onChange} />

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
