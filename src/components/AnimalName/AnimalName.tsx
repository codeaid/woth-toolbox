import clsx from 'clsx';
import { useTranslator } from 'hooks';
import type { AnimalNameProps } from './types';
import styles from './AnimalName.module.css';

export const AnimalName = (props: AnimalNameProps) => {
  const { animal, highlighted = false, responsive = false } = props;

  // Retrieve application translator
  const translate = useTranslator();

  return (
    <div
      className={clsx(styles.AnimalName, {
        [styles.AnimalNameHighlighted]: highlighted,
        [styles.AnimalNameResponsiveMobile]: responsive === 'mobile',
        [styles.AnimalNameResponsiveTablet]: responsive === 'tablet',
      })}
    >
      <div className={styles.AnimalNameTitle}>{translate(animal.heading)}</div>
      <div className={styles.AnimalNameLatin}>{translate(animal.latin)}</div>
    </div>
  );
};
