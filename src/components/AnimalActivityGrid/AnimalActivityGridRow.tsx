import { MouseEvent, useCallback } from 'react';
import { AnimalName } from 'components/AnimalName';
import { getActivityByHour, getCurrentActivityByHour } from 'lib/animals';
import { formatHour } from 'lib/utils';
import { AnimalActivityGridIcon } from './AnimalActivityGridIcon';
import { AnimalActivityGridRowProps } from './types';
import styles from './AnimalActivityGridRow.module.css';

export const AnimalActivityGridRow = (props: AnimalActivityGridRowProps) => {
  const { animal } = props;

  /**
   * Handle mouse entering hour cells
   */
  const handleMouseEnter = useCallback((event: MouseEvent) => {
    // Get nearest slot element
    const target = event.currentTarget.closest(
      `.${styles.AnimalActivityGridRowSlot}`,
    ) as HTMLElement;

    // Read hour data attribute value
    const hour = target?.dataset.hour;
    if (typeof hour === 'undefined') {
      return;
    }

    document
      .querySelectorAll(`[data-hour="${hour}"]`)
      .forEach(element =>
        element.classList.add(styles.AnimalActivityGridRowSlotHighlighted),
      );
  }, []);

  /**
   * Handle mouse leaving hour cells
   */
  const handleMouseLeave = useCallback(() => {
    document
      .querySelectorAll('[data-hour]')
      .forEach(element =>
        element.classList.remove(styles.AnimalActivityGridRowSlotHighlighted),
      );
  }, []);

  /**
   * Render hour activity icon
   *
   * @param hour Current hour
   */
  const renderHourIcon = (hour: number) => {
    const hourActivity = getActivityByHour(animal.lifeCycle, hour);

    // Render intermedia activity icon
    if (!hourActivity) {
      // Retrieve activity occurring at the current hour
      const currentActivity = getCurrentActivityByHour(animal.lifeCycle, hour);

      if (currentActivity) {
        return (
          <AnimalActivityGridIcon
            intermediate={true}
            key={`${animal.id}:${hour}:icon`}
            size={15}
            value={currentActivity}
          />
        );
      }

      return <>&#8203;</>;
    }

    return (
      <AnimalActivityGridIcon
        key={`${animal.id}:${hour}:icon`}
        size={24}
        value={hourActivity}
      />
    );
  };

  /**
   * Render hour activity
   *
   * @param hour Current hour
   */
  const renderHour = (hour: number) => (
    <div
      className={styles.AnimalActivityGridRowSlot}
      data-hour={hour}
      key={`${animal.id}:${hour}`}
      title={formatHour(hour)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderHourIcon(hour)}
    </div>
  );

  return (
    <div className={styles.AnimalActivityGridRow}>
      <div className={styles.AnimalActivityGridRowName}>
        <AnimalName animal={animal} />
      </div>

      <div className={styles.AnimalActivityGridRowSlots}>
        {Array.from(Array(24).keys()).map(renderHour)}
      </div>
    </div>
  );
};
