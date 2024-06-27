import clsx from 'clsx';
import { useCallback, useState } from 'react';
import type { MouseEvent } from 'react';
import { AnimalName } from 'components/AnimalName';
import { useTranslator } from 'hooks';
import { getActivityByHour, getCurrentActivityByHour } from 'lib/animals';
import { getAnimalActivityKey } from 'lib/i18n';
import { formatHour } from 'lib/utils';
import { AnimalActivityGridIcon } from './AnimalActivityGridIcon';
import type { AnimalActivityGridRowProps } from './types';
import styles from './AnimalActivityGridRow.module.css';

export const AnimalActivityGridRow = (props: AnimalActivityGridRowProps) => {
  const { animal } = props;

  // Flag indicating if row has been activated
  const [active, setActive] = useState(false);

  // Retrieve application translator
  const translate = useTranslator();

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
   * Handle clicks on slot rows
   */
  const handleSlotsClick = useCallback(
    () => setActive(current => !current),
    [],
  );

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
            intermediate
            key={`${animal.type}:${hour}:icon`}
            title={`${formatHour(hour)} - ${translate(
              getAnimalActivityKey(currentActivity.activity),
            )}`}
            value={currentActivity}
          />
        );
      }

      return <>&#8203;</>;
    }

    return (
      <AnimalActivityGridIcon
        key={`${animal.type}:${hour}:icon`}
        title={`${formatHour(hour)} - ${translate(
          getAnimalActivityKey(hourActivity.activity),
        )}`}
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
      key={`${animal.type}:${hour}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderHourIcon(hour)}
    </div>
  );

  return (
    <div className={styles.AnimalActivityGridRow}>
      <div className={styles.AnimalActivityGridRowName}>
        <AnimalName animal={animal} responsive="tablet" />
      </div>

      <div
        className={clsx(styles.AnimalActivityGridRowSlots, {
          [styles.AnimalActivityGridRowSlotsActive]: active,
        })}
        onClick={handleSlotsClick}
      >
        {Array.from(Array(24).keys()).map(renderHour)}
      </div>
    </div>
  );
};
