import classnames from 'classnames';
import Image from 'next/image';
import { AnimalActivity } from 'types/animals';
import IconDrink from './assets/drink.png';
import IconFeed from './assets/feed.png';
import IconSleep from './assets/sleep.png';
import { AnimalActivityGridIconProps } from './types';
import styles from './AnimalActivityGridIcon.module.css';

export const AnimalActivityGridIcon = (props: AnimalActivityGridIconProps) => {
  const { intermediate = false, size, value } = props;

  // Extract activity type
  const { activity } = value;

  const imgProps = {
    className: classnames({
      [styles.AnimalActivityGridIconIntermediate]: intermediate,
    }),
    draggable: false,
    height: size,
    width: size,
  };

  switch (activity) {
    case AnimalActivity.Drinking:
      return <Image {...imgProps} alt="Drinking" src={IconDrink.src} />;
    case AnimalActivity.Feeding:
      return <Image {...imgProps} alt="Feeding" src={IconFeed.src} />;
    case AnimalActivity.Sleeping:
      return <Image {...imgProps} alt="Sleeping" src={IconSleep.src} />;

    default:
      return null;
  }
};
