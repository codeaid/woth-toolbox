import { AnimalActivityGridRow } from './AnimalActivityGridRow';
import type { AnimalActivityGridRowsProps } from './types';
import styles from './AnimalActivityGridRows.module.css';

export const AnimalActivityGridRows = (props: AnimalActivityGridRowsProps) => {
  const { animals } = props;

  return (
    <div className={styles.AnimalActivityGridRows}>
      {animals.map(animal => (
        <AnimalActivityGridRow animal={animal} key={animal.type} />
      ))}
    </div>
  );
};
