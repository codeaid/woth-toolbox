import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { zeroWidthSpace } from 'config/html';
import { useTranslator } from 'hooks';
import { isMarkerComplete } from 'lib/debug';
import { getAnimalTypeKey } from 'lib/i18n';
import { getNeedZoneCounts } from 'lib/markers';
import { formatDateTime } from 'lib/utils';
import { DebugPanelIconRow } from './DebugPanelIconRow';
import { DebugPanelMarkerProps } from './types';
import styles from './DebugPanelMarker.module.css';

export const DebugPanelMarker = (props: DebugPanelMarkerProps) => {
  const {
    marker,
    onDelete,
    onDrinkZoneRemove,
    onEatZoneRemove,
    onSleepZoneRemove,
  } = props;

  // Retrieve application translator
  const translate = useTranslator();

  // Get number of drink, eat and sleep zones for the current animal
  const [drinkZoneCount, eatZoneCount, sleepZoneCount] = useMemo(
    () => getNeedZoneCounts(marker.type),
    [marker.type],
  );

  // Flag indicating whether the marker has all need zones defined
  const isCompleted = useMemo(
    () =>
      isMarkerComplete(marker, drinkZoneCount, eatZoneCount, sleepZoneCount),
    [drinkZoneCount, eatZoneCount, marker, sleepZoneCount],
  );

  /**
   * Handle deleting current marker
   */
  const handleDelete = useCallback(() => onDelete(marker), [marker, onDelete]);

  /**
   * Handle removing a drink zone with the specified index
   *
   * @param index Target index to remove
   */
  const handleDrinkZoneRemove = useCallback(
    (index: number) => onDrinkZoneRemove(marker, index),
    [marker, onDrinkZoneRemove],
  );

  /**
   * Handle removing an eat zone with the specified index
   *
   * @param index Target index to remove
   */
  const handleEatZoneRemove = useCallback(
    (index: number) => onEatZoneRemove(marker, index),
    [marker, onEatZoneRemove],
  );

  /**
   * Handle removing a sleep zone with the specified index
   *
   * @param index Target index to remove
   */
  const handleSleepZoneRemove = useCallback(
    (index: number) => onSleepZoneRemove(marker, index),
    [marker, onSleepZoneRemove],
  );

  return (
    <div
      className={clsx(styles.DebugPanelMarker, {
        [styles.DebugPanelMarkerCompleted]: isCompleted,
      })}
      key={marker.id}
    >
      <div className={styles.DebugPanelMarkerHeader}>
        <div className={styles.DebugPanelMarkerName}>
          {translate(getAnimalTypeKey(marker.type))}
        </div>
        <RiDeleteBin6Line
          className={styles.DebugPanelMarkerActionDelete}
          onClick={handleDelete}
        />
      </div>

      <div className={styles.DebugPanelMarkerRows}>
        <DebugPanelIconRow
          caption={translate('ANIMAL:NEED_ZONE_DRINKING_01')}
          completedCount={marker.drink.length}
          disabled={isCompleted}
          iconType="zone:drink"
          totalCount={drinkZoneCount}
          onZoneRemove={handleDrinkZoneRemove}
        />
        <DebugPanelIconRow
          caption={translate('ANIMAL:NEED_ZONE_EATING_01')}
          completedCount={marker.eat.length}
          disabled={isCompleted}
          iconType="zone:eat"
          totalCount={eatZoneCount}
          onZoneRemove={handleEatZoneRemove}
        />
        <DebugPanelIconRow
          caption={translate('ANIMAL:NEED_ZONE_RESTING_01')}
          completedCount={marker.sleep.length}
          disabled={isCompleted}
          iconType="zone:sleep"
          totalCount={sleepZoneCount}
          onZoneRemove={handleSleepZoneRemove}
        />
      </div>

      <div className={styles.DebugPanelMarkerStatus}>
        {marker.meta?.created
          ? formatDateTime(marker.meta.created)
          : zeroWidthSpace}
      </div>
    </div>
  );
};
