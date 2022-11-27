import classnames from 'classnames';
import { Icon } from 'components/Icon';
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
      return <Icon {...imgProps} type="zone:drink" />;
    case AnimalActivity.Feeding:
      return <Icon {...imgProps} type="zone:eat" />;
    case AnimalActivity.Sleeping:
      return <Icon {...imgProps} type="zone:sleep" />;
    default:
      return null;
  }
};
