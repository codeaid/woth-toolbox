import clsx from 'clsx';
import { DrinkZoneIcon, EatZoneIcon, SleepZoneIcon } from 'components/Icon';
import { AnimalActivity } from 'types/animals';
import { AnimalActivityGridIconProps } from './types';
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
    case AnimalActivity.Drinking:
      return <DrinkZoneIcon {...imgProps} />;
    case AnimalActivity.Feeding:
      return <EatZoneIcon {...imgProps} />;
    case AnimalActivity.Sleeping:
      return <SleepZoneIcon {...imgProps} />;
    default:
      return null;
  }
};
