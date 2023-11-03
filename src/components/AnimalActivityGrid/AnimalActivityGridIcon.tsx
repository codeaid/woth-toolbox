import clsx from 'clsx';
import { DrinkZoneIcon, EatZoneIcon, SleepZoneIcon } from 'components/Icon';
import type { AnimalActivityGridIconProps } from './types';
import styles from './AnimalActivityGridIcon.module.css';

export const AnimalActivityGridIcon = (props: AnimalActivityGridIconProps) => {
  const { intermediate = false, title, value } = props;

  // Extract activity type
  const { activity } = value;

  const imgProps = {
    className: clsx({
      [styles.AnimalActivityGridIconIntermediate]: intermediate,
    }),
    size: 24,
    title,
  };

  switch (activity) {
    case 'drinking':
      return <DrinkZoneIcon {...imgProps} />;
    case 'feeding':
      return <EatZoneIcon {...imgProps} />;
    case 'sleeping':
      return <SleepZoneIcon {...imgProps} />;
    default:
      return null;
  }
};
