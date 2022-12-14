import classnames from 'classnames';
import { useMemo } from 'react';
import { useTranslator } from 'hooks';
import { WeaponNameProps } from './types';
import styles from './WeaponName.module.css';

export const WeaponName = (props: WeaponNameProps) => {
  const { highlighted = false, responsive = false, weapon } = props;

  // Retrieve application translator
  const translate = useTranslator();

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
      <div className={styles.WeaponNameTitle}>{translate(weapon.heading)}</div>
      <div className={styles.WeaponNameCalibre}>
        {translate(weapon.caliber)}
      </div>
    </div>
  );
};
