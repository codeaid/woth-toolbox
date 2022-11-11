import { AnimalNameProps } from './types';
import styles from './AnimalName.module.css';

export const AnimalName = (props: AnimalNameProps) => {
  const { animal } = props;

  return (
    <div className={styles.AnimalName}>
      <div className={styles.AnimalNameTitle}>{animal.name}</div>
      <div className={styles.AnimalNameLatin}>{animal.latin}</div>
    </div>
  );
};
