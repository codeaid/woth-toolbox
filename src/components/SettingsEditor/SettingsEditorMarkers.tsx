import { useCallback, useMemo } from 'react';
import Slider from 'react-slider';
import { Label } from 'components/Label';
import { useTranslator } from 'hooks';
import { SettingsEditorMarkersProps } from './types';
import styles from './SettingsEditorMarkers.module.css';

export const SettingsEditorMarkers = (props: SettingsEditorMarkersProps) => {
  const { settings, onChange } = props;

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
        className={styles.SettingsEditorMarkersSlider}
        max={100}
        min={15}
        thumbClassName={styles.SettingsEditorMarkersSliderThumb}
        trackClassName={styles.SettingsEditorMarkersSliderTrack}
        value={value}
        onChange={onChange}
      />
    ),
    [],
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
    [handleZoneSizeChange, renderSlider, settings.zoneMarkerSize],
  );

  return (
    <>
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
    </>
  );
};
