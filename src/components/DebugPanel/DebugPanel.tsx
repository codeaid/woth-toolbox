import { useCallback, useEffect, useMemo, useState } from 'react';
import { RiCodeSSlashLine } from 'react-icons/ri';
import { ButtonProps } from 'components/Button';
import { IconButton } from 'components/IconButton';
import { Label } from 'components/Label';
import { SidePanel } from 'components/SidePanel';
import { animalMarkerTypes } from 'config/markers';
import { useTranslator } from 'hooks';
import { getAnimalTypeKey } from 'lib/i18n';
import { getNeedZoneCounts } from 'lib/markers';
import { AnimalType } from 'types/animals';
import { MarkerOptionsAnimal } from 'types/markers';
import { DebugPanelAnimalList } from './DebugPanelAnimalList';
import { DebugPanelMarker } from './DebugPanelMarker';
import { DebugPanelProps } from './types';
import styles from './DebugPanel.module.css';

export const DebugPanel = (props: DebugPanelProps) => {
  const {
    currentMarker,
    enabled = false,
    markers,
    onClear,
    onCopy,
    onDrinkZoneRemove,
    onEatZoneRemove,
    onMarkerDelete,
    onSettingsChange,
    onSleepZoneRemove,
  } = props;

  // Flag indicating whether the debug panel is open
  const [open, setOpen] = useState(false);

  // Currently selected animal type
  const [type, setType] = useState<AnimalType>(animalMarkerTypes[0]);

  // Retrieve application translator
  const translate = useTranslator();

  // Get number of drink, eat and sleep zones for the current animal
  const [drinkZoneCount, eatZoneCount, sleepZoneCount] = useMemo(
    () => getNeedZoneCounts(type),
    [type],
  );

  /**
   * Handle changing currently selected animal
   *
   * @param type New animal type
   */
  const handleChangeAnimal = useCallback(
    (type: AnimalType) => {
      // Clear current marker data
      if (currentMarker) {
        onMarkerDelete(currentMarker);
      }

      // Update animal type
      setType(type);
    },
    [currentMarker, onMarkerDelete],
  );

  /**
   * Handle closing the panel
   */
  const handleClose = useCallback(() => setOpen(false), []);

  /**
   * Handle opening or closing the panel
   */
  const handleToggleOpen = useCallback(() => setOpen(current => !current), []);

  /**
   * Render a marker info entry
   *
   * @param marker Source animal marker object
   */
  const renderMarker = useCallback(
    (marker: MarkerOptionsAnimal) => (
      <DebugPanelMarker
        key={marker.id}
        marker={marker}
        onDelete={onMarkerDelete}
        onDrinkZoneRemove={onDrinkZoneRemove}
        onEatZoneRemove={onEatZoneRemove}
        onSleepZoneRemove={onSleepZoneRemove}
      />
    ),
    [onDrinkZoneRemove, onEatZoneRemove, onMarkerDelete, onSleepZoneRemove],
  );

  // List of sidebar action button properties
  const actions = useMemo<Array<ButtonProps>>(
    () => [
      {
        className: styles.DebugPanelActionCopy,
        children: translate('TOOLBOX:COPY'),
        disabled: !markers.length,
        onClick: onCopy,
      },
      {
        className: styles.DebugPanelActionClear,
        children: translate('UI:CLEAR'),
        disabled: !markers.length && !currentMarker,
        onClick: onClear,
      },
    ],
    [currentMarker, markers.length, onClear, onCopy, translate],
  );

  // List of completed marker components
  const renderedCompletedMarkers = useMemo(
    () =>
      markers.length > 0 ? (
        <div className={styles.DebugPanelMarkers}>
          {markers.map(renderMarker)}
        </div>
      ) : (
        <div className={styles.DebugPanelPlaceholder}>
          {translate('TOOLBOX:DEBUG_EDITOR_COMPLETED_HINT')}
        </div>
      ),
    [markers, renderMarker, translate],
  );

  // Marker entry that is currently being created
  const renderedPendingMarker = useMemo(
    () =>
      currentMarker ? (
        renderMarker(currentMarker)
      ) : (
        <div className={styles.DebugPanelPlaceholder}>
          {translate('TOOLBOX:DEBUG_EDITOR_ACTIVE_HINT')}
        </div>
      ),
    [currentMarker, renderMarker, translate],
  );

  // Notify consumers about settings changes
  useEffect(
    () =>
      onSettingsChange({
        drinkZoneCount,
        eatZoneCount,
        enabled,
        open,
        sleepZoneCount,
        type,
      }),
    [
      drinkZoneCount,
      eatZoneCount,
      enabled,
      onSettingsChange,
      open,
      sleepZoneCount,
      type,
    ],
  );

  // Don't render the panel and the button if it's not enabled
  if (!enabled) {
    return null;
  }

  return (
    <>
      <IconButton
        className={styles.DebugPanelToggleButton}
        onClick={handleToggleOpen}
      >
        <RiCodeSSlashLine />
      </IconButton>

      <SidePanel
        actions={actions}
        closeOnEscape={false}
        title={translate('TOOLBOX:MARKER_CREATOR')}
        visible={open}
        onClose={handleClose}
      >
        <div className={styles.DebugPanelContent}>
          <Label>
            {translate('UI:SECTION_ANIMALS')} (
            {translate(getAnimalTypeKey(type))})
          </Label>
          <DebugPanelAnimalList selected={type} onSelect={handleChangeAnimal} />

          <Label>{translate('UI:OBJECTIVE_ACTIVE')}</Label>
          {renderedPendingMarker}

          <Label>
            {translate('UI:OBJECTIVE_COMPLETED')} ({markers.length})
          </Label>
          {renderedCompletedMarkers}
        </div>
      </SidePanel>
    </>
  );
};
