import classnames from 'classnames';
import { AnimalNameProps } from './types';
import styles from './AnimalName.module.css';

export const AnimalName = (props: AnimalNameProps) => {
  const { animal, responsive = false } = props;

  return (
    <div
      className={classnames(styles.AnimalName, {
        [styles.AnimalNameResponsive]: responsive,
      })}
    >
      <div className={styles.AnimalNameTitle}>{animal.name}</div>
      <div className={styles.AnimalNameLatin}>{animal.latin}</div>
    </div>
  );
};
