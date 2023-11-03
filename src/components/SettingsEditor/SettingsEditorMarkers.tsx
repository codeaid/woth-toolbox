import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import { Checkbox } from 'components/Checkbox';
import { Label } from 'components/Label';
import { Slider } from 'components/Slider';
import { useTranslator } from 'hooks';
import type { SettingsEditorMarkersProps } from './types';

export const SettingsEditorMarkers = (props: SettingsEditorMarkersProps) => {
  const { settings, onChange } = props;

  // Retrieve application translator
  const translate = useTranslator();

  /**
   * Handle changing checkbox value
   */
  const handleAnimalRatingChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      onChange({ animalMarkerRatings: event.target.checked }),
    [onChange],
  );

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
        max={150}
        min={0}
        value={settings.genericMarkerSize}
        onChange={handleGenericSizeChange}
      />

      <Label>
        {translate('TOOLBOX:SETTINGS_MARKER_SIZE_ANIMALS')} (
        {settings.animalMarkerSize})
      </Label>
      <Slider
        max={150}
        min={0}
        value={settings.animalMarkerSize}
        onChange={handleAnimalSizeChange}
      />

      <Label>
        {translate('TOOLBOX:SETTINGS_MARKER_SIZE_ZONES')} (
        {settings.zoneMarkerSize})
      </Label>
      <Slider
        max={150}
        min={0}
        value={settings.zoneMarkerSize}
        onChange={handleZoneSizeChange}
      />

      <Label>{translate('UI:TROPHY_RATING')}</Label>
      <Checkbox
        checked={settings.animalMarkerRatings}
        onChange={handleAnimalRatingChange}
      />
    </div>
  );
};
