import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { WeaponName } from 'components/WeaponName';
import type { WeaponListItemProps } from './types';
import styles from './WeaponListItem.module.css';

export const WeaponListItem = (props: WeaponListItemProps) => {
  const { active = false, weapon, onClick } = props;

  // Generate item class name
  const className = useMemo(
    () =>
      clsx(styles.WeaponListItem, {
        [styles.WeaponListItemActive]: active,
      }),
    [active],
  );

  /**
   * Handle clicks on the current item
   */
  const handleClick = useCallback(() => onClick(weapon), [weapon, onClick]);

  return (
    <li className={className} onClick={handleClick}>
      <div className={styles.WeaponListItemContent}>
        <WeaponName weapon={weapon} />
      </div>
    </li>
  );
};
