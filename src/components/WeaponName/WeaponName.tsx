import classnames from 'classnames';
import { getWeaponName } from 'lib/weapons';
import { WeaponNameProps } from './types';
import styles from './WeaponName.module.css';
import { useMemo } from 'react';

export const WeaponName = (props: WeaponNameProps) => {
  const { highlighted = false, responsive = false, weapon } = props;

  // Generate component's class name
  const className = useMemo(
    () =>
      classnames(styles.WeaponName, {
        [styles.WeaponNameHighlighted]: highlighted,
        [styles.WeaponNameResponsive]: responsive,
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
