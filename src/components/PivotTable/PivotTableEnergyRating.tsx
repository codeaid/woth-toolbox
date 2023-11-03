import clsx from 'clsx';
import { useMemo } from 'react';
import { useLocale } from 'hooks';
import { formatNumber } from 'lib/utils';
import type { PivotTableEnergyRatingProps } from './types';
import styles from './PivotTableEnergyRating.module.css';

export const PivotTableEnergyRating = (props: PivotTableEnergyRatingProps) => {
  const { optimal = false, suboptimal = false, value } = props;

  // Retrieve application locale
  const locale = useLocale();

  // Generate component's class name
  const className = useMemo(
    () =>
      clsx(styles.PivotTableEnergyRating, {
        [styles.PivotTableEnergyRatingOptimal]: optimal,
        [styles.PivotTableEnergyRatingSuboptimal]: suboptimal,
      }),
    [optimal, suboptimal],
  );

  // Format numeric value based on the current locale
  const formattedValue = useMemo(
    () => (value ? formatNumber(value, locale) : '-'),
    [locale, value],
  );

  return <div className={className}>{formattedValue}</div>;
};
