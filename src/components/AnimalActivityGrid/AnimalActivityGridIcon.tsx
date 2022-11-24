import classnames from 'classnames';
import { Marker } from 'components/Marker';
import { AnimalActivity } from 'types/animals';
import { AnimalActivityGridIconProps } from './types';
import styles from './AnimalActivityGridIcon.module.css';

export const AnimalActivityGridIcon = (props: AnimalActivityGridIconProps) => {
  const { intermediate = false, title, value } = props;

  // Extract activity type
  const { activity } = value;

  const imgProps = {
    className: classnames({
      [styles.AnimalActivityGridIconIntermediate]: intermediate,
    }),
    size: 24,
    title,
  };

  switch (activity) {
    case AnimalActivity.Drinking:
      return <Marker {...imgProps} type="zone:drink" />;
    case AnimalActivity.Feeding:
      return <Marker {...imgProps} type="zone:eat" />;
    case AnimalActivity.Sleeping:
      return <Marker {...imgProps} type="zone:sleep" />;
    default:
      return null;
  }
};
