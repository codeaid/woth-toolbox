import { useCallback } from 'react';
import { Label } from 'components/Label';
import { Slider } from 'components/Slider';
import { useTranslator } from 'hooks';
import { SettingsEditorMarkersProps } from './types';

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

  return (
    <div>
      <Label>
        {translate('TOOLBOX:SETTINGS_MARKER_SIZE_GENERIC')} (
        {settings.genericMarkerSize})
      </Label>
      <Slider
        min={15}
        value={settings.genericMarkerSize}
        onChange={handleGenericSizeChange}
      />

      <Label>
        {translate('TOOLBOX:SETTINGS_MARKER_SIZE_ANIMALS')} (
        {settings.animalMarkerSize})
      </Label>
      <Slider
        min={15}
        value={settings.animalMarkerSize}
        onChange={handleAnimalSizeChange}
      />

      <Label>
        {translate('TOOLBOX:SETTINGS_MARKER_SIZE_ZONES')} (
        {settings.zoneMarkerSize})
      </Label>
      <Slider
        min={15}
        value={settings.zoneMarkerSize}
        onChange={handleZoneSizeChange}
      />
    </div>
  );
};
