import classnames from 'classnames';
import Image from 'next/image';
import { baseUrl } from 'config/app';
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
    draggable: false,
    height: 24,
    title,
    width: 24,
  };

  switch (activity) {
    case AnimalActivity.Drinking:
      return (
        <Image {...imgProps} alt="Drinking" src={`${baseUrl}/img/drink.png`} />
      );
    case AnimalActivity.Feeding:
      return (
        <Image {...imgProps} alt="Feeding" src={`${baseUrl}/img/feed.png`} />
      );
    case AnimalActivity.Sleeping:
      return (
        <Image {...imgProps} alt="Sleeping" src={`${baseUrl}/img/sleep.png`} />
      );

    default:
      return null;
  }
};
