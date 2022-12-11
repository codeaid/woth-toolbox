import { useCallback, useMemo } from 'react';
import Slider from 'react-slider';
import { ButtonProps } from 'components/Button';
import { Label } from 'components/Label';
import { SidePanel } from 'components/SidePanel';
import { SettingsEditorProps } from './types';
import styles from './SettingsEditor.module.css';

export const SettingsEditor = (props: SettingsEditorProps) => {
  const { settings, visible = false, onChange, onClose } = props;

  // Destructure settings
  const { animalMarkerSize, genericMarkerSize, zoneMarkerSize } = useMemo(
    () => settings,
    [settings],
  );

  /**
   * Handle changes to animal marker size
   */
  const handleAnimalSizeChange = useCallback(
    (animalMarkerSize: number) => onChange({ ...settings, animalMarkerSize }),
    [onChange, settings],
  );

  /**
   * Handle changes to generic marker size
   */
  const handleGenericSizeChange = useCallback(
    (genericMarkerSize: number) => onChange({ ...settings, genericMarkerSize }),
    [onChange, settings],
  );

  /**
   * Handle resetting application settings
   */
  const handleReset = useCallback(() => onChange(), [onChange]);

  /**
   * Handle changes to animal need zone marker size
   */
  const handleZoneSizeChange = useCallback(
    (zoneMarkerSize: number) => onChange({ ...settings, zoneMarkerSize }),
    [onChange, settings],
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
        children: 'Reset',
        className: styles.SettingsEditorResetButton,
        onClick: handleReset,
      },
    ],
    [handleReset],
  );

  // Rendered animal marker size slider
  const renderedAnimalMarkerSize = useMemo(
    () => renderSlider(animalMarkerSize, handleAnimalSizeChange),
    [animalMarkerSize, handleAnimalSizeChange, renderSlider],
  );

  // Rendered generic marker size slider
  const renderedGenericMarkerSize = useMemo(
    () => renderSlider(genericMarkerSize, handleGenericSizeChange),
    [genericMarkerSize, handleGenericSizeChange, renderSlider],
  );

  // Rendered animal need zone marker size slider
  const renderedZoneMarkerSize = useMemo(
    () => renderSlider(zoneMarkerSize, handleZoneSizeChange),
    [zoneMarkerSize, handleZoneSizeChange, renderSlider],
  );

  return (
    <SidePanel
      actions={actions}
      className={styles.SettingsEditorSidePanel}
      closeOnOutsideClick={true}
      title="Settings"
      visible={visible}
      onClose={onClose}
    >
      <div className={styles.SettingsEditor}>
        <Label>Generic marker size ({genericMarkerSize})</Label>
        {renderedGenericMarkerSize}

        <Label>Animal marker size ({animalMarkerSize})</Label>
        {renderedAnimalMarkerSize}

        <Label>Need zone marker size ({zoneMarkerSize})</Label>
        {renderedZoneMarkerSize}
      </div>
    </SidePanel>
  );
};
