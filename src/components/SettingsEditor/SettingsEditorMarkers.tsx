import type { ChangeEvent } from 'react';
import { useCallback } from 'react';
import { Checkbox } from 'components/Checkbox';
import { Label } from 'components/Label';
import { Slider } from 'components/Slider';
import { useSettings, useTranslator } from 'hooks';

export const SettingsEditorMarkers = () => {
  const { onSettingsRead, onSettingsUpdateAsync } = useSettings();

  // Retrieve application translator
  const translate = useTranslator();

  const animalMarkerRatings = onSettingsRead('marker:animal:ratings', true);
  const animalMarkerSize = onSettingsRead('marker:animal:size', 50);
  const genericMarkerSize = onSettingsRead('marker:generic:size', 50);
  const zoneMarkerSize = onSettingsRead('marker:zone:size', 35);

  /**
   * Handle changing checkbox value
   */
  const handleAnimalRatingChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      onSettingsUpdateAsync('marker:animal:ratings', event.target.checked),
    [onSettingsUpdateAsync],
  );

  /**
   * Handle changes to animal marker size
   */
  const handleAnimalSizeChange = useCallback(
    (animalMarkerSize: number) =>
      onSettingsUpdateAsync('marker:animal:size', animalMarkerSize),
    [onSettingsUpdateAsync],
  );

  /**
   * Handle changes to generic marker size
   */
  const handleGenericSizeChange = useCallback(
    (genericMarkerSize: number) =>
      onSettingsUpdateAsync('marker:generic:size', genericMarkerSize),
    [onSettingsUpdateAsync],
  );

  /**
   * Handle changes to animal need zone marker size
   */
  const handleZoneSizeChange = useCallback(
    (zoneMarkerSize: number) =>
      onSettingsUpdateAsync('marker:zone:size', zoneMarkerSize),
    [onSettingsUpdateAsync],
  );

  return (
    <div>
      <Label>
        {translate('TOOLBOX:SETTINGS_MARKER_SIZE_GENERIC')} ({genericMarkerSize}
        )
      </Label>
      <Slider
        max={150}
        min={0}
        value={genericMarkerSize}
        onChange={handleGenericSizeChange}
      />

      <Label>
        {translate('TOOLBOX:SETTINGS_MARKER_SIZE_ANIMALS')} ({animalMarkerSize})
      </Label>
      <Slider
        max={150}
        min={0}
        value={animalMarkerSize}
        onChange={handleAnimalSizeChange}
      />

      <Label>
        {translate('TOOLBOX:SETTINGS_MARKER_SIZE_ZONES')} ({zoneMarkerSize})
      </Label>
      <Slider
        max={150}
        min={0}
        value={zoneMarkerSize}
        onChange={handleZoneSizeChange}
      />

      <Label>{translate('UI:TROPHY_RATING')}</Label>
      <Checkbox
        checked={animalMarkerRatings}
        onChange={handleAnimalRatingChange}
      />
    </div>
  );
};
