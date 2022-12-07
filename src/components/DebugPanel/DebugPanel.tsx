import { useCallback, useEffect, useMemo, useState } from 'react';
import { RiCodeSSlashLine } from 'react-icons/ri';
import { ButtonProps } from 'components/Button';
import { IconButton } from 'components/IconButton';
import { Label } from 'components/Label';
import { SidePanel } from 'components/SidePanel';
import { animalMarkerTypes } from 'config/markers';
import { getAnimalName } from 'lib/animals';
import { getNeedZoneCounts } from 'lib/markers';
import { AnimalType } from 'types/animals';
import { AnimalMarkerOptions } from 'types/markers';
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

  // Get number of drink, eat and sleep zones for the current animal
  const [drinkZoneCount, eatZoneCount, sleepZoneCount] = useMemo(
    () => getNeedZoneCounts(type),
    [type],
  );

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
    (marker: AnimalMarkerOptions) => (
      <DebugPanelMarker
        drinkZoneCount={drinkZoneCount}
        eatZoneCount={eatZoneCount}
        key={marker.id}
        marker={marker}
        sleepZoneCount={sleepZoneCount}
        onDelete={onMarkerDelete}
        onDrinkZoneRemove={onDrinkZoneRemove}
        onEatZoneRemove={onEatZoneRemove}
        onSleepZoneRemove={onSleepZoneRemove}
      />
    ),
    [
      drinkZoneCount,
      eatZoneCount,
      onDrinkZoneRemove,
      onEatZoneRemove,
      onMarkerDelete,
      onSleepZoneRemove,
      sleepZoneCount,
    ],
  );

  // List of sidebar action button properties
  const actions = useMemo<Array<ButtonProps>>(
    () => [
      {
        className: styles.DebugPanelActionCopy,
        children: 'Copy',
        disabled: !markers.length,
        onClick: onCopy,
      },
      {
        className: styles.DebugPanelActionClear,
        children: 'Clear',
        disabled: !markers.length && !currentMarker,
        onClick: onClear,
      },
    ],
    [currentMarker, markers.length, onClear, onCopy],
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
          No completed markers available
        </div>
      ),
    [markers, renderMarker],
  );

  // Marker entry that is currently being created
  const renderedPendingMarker = useMemo(
    () =>
      currentMarker ? (
        renderMarker(currentMarker)
      ) : (
        <div className={styles.DebugPanelPlaceholder}>
          Click anywhere on the map to create a new marker
        </div>
      ),
    [currentMarker, renderMarker],
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

      {open ? (
        <SidePanel
          actions={actions}
          title="Animal Marker Creator"
          visible={true}
          onClose={handleToggleOpen}
        >
          <Label>Animals ({getAnimalName(type)})</Label>
          <DebugPanelAnimalList selected={type} onSelect={setType} />

          <Label>Current marker</Label>
          {renderedPendingMarker}

          <Label>Completed Markers ({markers.length})</Label>
          {renderedCompletedMarkers}
        </SidePanel>
      ) : null}
    </>
  );
};
