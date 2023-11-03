import clsx from 'clsx';
import { useMemo } from 'react';
import { useTranslator } from 'hooks';
import type { WeaponNameProps } from './types';
import styles from './WeaponName.module.css';

export const WeaponName = (props: WeaponNameProps) => {
  const { highlighted = false, responsive = false, weapon } = props;

  // Retrieve application translator
  const translate = useTranslator();

  // Generate component's class name
  const className = useMemo(
    () =>
      clsx(styles.WeaponName, {
        [styles.WeaponNameHighlighted]: highlighted,
        [styles.WeaponNameResponsiveMobile]: responsive === 'mobile',
        [styles.WeaponNameResponsiveTablet]: responsive === 'tablet',
      }),
    [highlighted, responsive],
  );

  return (
    <div className={className}>
      <div className={styles.WeaponNameTitle}>{translate(weapon.heading)}</div>
      <div className={styles.WeaponNameCalibre}>
        {weapon.caliber ? translate(weapon.caliber) : '-'}
      </div>
    </div>
  );
};
