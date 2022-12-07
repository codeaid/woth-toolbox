import classnames from 'classnames';
import { format } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { getAnimalName } from 'lib/animals';
import { isMarkerComplete } from 'lib/debug';
import { getNeedZoneCounts } from 'lib/markers';
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
      className={classnames(styles.DebugPanelMarker, {
        [styles.DebugPanelMarkerCompleted]: isCompleted,
      })}
      key={marker.id}
    >
      <div className={styles.DebugPanelMarkerHeader}>
        <div className={styles.DebugPanelMarkerName}>
          {getAnimalName(marker.type)}
        </div>
        <RiDeleteBin6Line
          className={styles.DebugPanelMarkerActionDelete}
          onClick={handleDelete}
        />
      </div>

      <div className={styles.DebugPanelMarkerRows}>
        <DebugPanelIconRow
          caption="Drink zones"
          completedCount={marker.drink.length}
          disabled={isCompleted}
          iconType="zone:drink"
          totalCount={drinkZoneCount}
          onZoneRemove={handleDrinkZoneRemove}
        />
        <DebugPanelIconRow
          caption="Feed zones"
          completedCount={marker.eat.length}
          disabled={isCompleted}
          iconType="zone:eat"
          totalCount={eatZoneCount}
          onZoneRemove={handleEatZoneRemove}
        />
        <DebugPanelIconRow
          caption="Sleep zones"
          completedCount={marker.sleep.length}
          disabled={isCompleted}
          iconType="zone:sleep"
          totalCount={sleepZoneCount}
          onZoneRemove={handleSleepZoneRemove}
        />
      </div>

      <div className={styles.DebugPanelMarkerStatus}>
        {marker.debug?.created
          ? format(marker.debug.created, 'Pp')
          : 'In progress...'}
      </div>
    </div>
  );
};
