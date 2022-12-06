import classnames from 'classnames';
import { useMemo } from 'react';
import { getWeaponName } from 'lib/weapons';
import { WeaponNameProps } from './types';
import styles from './WeaponName.module.css';

export const WeaponName = (props: WeaponNameProps) => {
  const { highlighted = false, responsive = false, weapon } = props;

  // Generate component's class name
  const className = useMemo(
    () =>
      classnames(styles.WeaponName, {
        [styles.WeaponNameHighlighted]: highlighted,
        [styles.WeaponNameResponsiveMobile]: responsive === 'mobile',
        [styles.WeaponNameResponsiveTablet]: responsive === 'tablet',
      }),
    [highlighted, responsive],
  );

  return (
    <div className={className}>
      <div className={styles.WeaponNameTitle}>{getWeaponName(weapon)}</div>
      <div className={styles.WeaponNameCalibre}>{weapon.calibre}</div>
    </div>
  );
};
