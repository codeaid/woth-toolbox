import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { AnimalName } from 'components/AnimalName';
import type { AnimalListItemProps } from './types';
import styles from './AnimalListItem.module.css';

export const AnimalListItem = (props: AnimalListItemProps) => {
  const { active = false, animal, onClick } = props;

  // Generate item class name
  const className = useMemo(
    () =>
      clsx(styles.AnimalListItem, {
        [styles.AnimalListItemActive]: active,
      }),
    [active],
  );

  /**
   * Handle clicks on the current item
   */
  const handleClick = useCallback(() => onClick(animal), [animal, onClick]);

  return (
    <li className={className} onClick={handleClick}>
      <div className={styles.AnimalListItemContent}>
        <AnimalName animal={animal} />
      </div>
    </li>
  );
};
