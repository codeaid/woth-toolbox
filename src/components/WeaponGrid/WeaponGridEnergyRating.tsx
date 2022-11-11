import classnames from 'classnames';
import { useMemo } from 'react';
import { formatNumber } from 'lib/utils';
import { WeaponGridEnergyItemProps } from './types';
import styles from './WeaponGridEnergyRating.module.css';

export const WeaponGridEnergyRating = (props: WeaponGridEnergyItemProps) => {
  const { optimal = false, suboptimal = false, value } = props;

  // Generate component's class name
  const className = useMemo(
    () =>
      classnames(styles.WeaponGridEnergyRating, {
        [styles.WeaponGridEnergyRatingOptimal]: optimal,
        [styles.WeaponGridEnergyRatingSuboptimal]: suboptimal,
      }),
    [optimal, suboptimal],
  );

  // Format numeric value based on the current locale
  const formattedValue = useMemo(() => formatNumber(value), [value]);

  return <div className={className}>{formattedValue}</div>;
};
