import { useMemo } from 'react';
import { getAnimalGroups } from 'lib/animals';
import { AnimalActivityGridGroup } from './AnimalActivityGridGroup';
import { AnimalActivityGridProps } from './types';
import styles from './AnimalActivityGrid.module.css';

export const AnimalActivityGrid = (props: AnimalActivityGridProps) => {
  const { animals } = props;

  // Group animals by their tiers
  const animalGroups = useMemo(() => getAnimalGroups(animals), [animals]);

  return (
    <div className={styles.AnimalActivityGrid}>
      <div className={styles.AnimalActivityGrid}>
        {animalGroups.map(group => (
          <AnimalActivityGridGroup group={group} key={group.tier} />
        ))}
      </div>
    </div>
  );
};
