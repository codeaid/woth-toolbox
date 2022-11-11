import classnames from 'classnames';
import { useCallback, useMemo } from 'react';
import { AnimalListItemProps } from './types';
import styles from './AnimalListItem.module.css';

export const AnimalListItem = (props: AnimalListItemProps) => {
  const { active = false, animal, onClick } = props;

  // Generate item class name
  const className = useMemo(
    () =>
      classnames(styles.AnimalListItem, {
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
        <div className={styles.AnimalListItemTitle}>{animal.name}</div>
        <div className={styles.AnimalListItemSubtitle}>{animal.latin}</div>
      </div>
    </li>
  );
};
