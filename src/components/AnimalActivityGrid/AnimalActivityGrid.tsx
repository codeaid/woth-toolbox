import { useMemo } from 'react';
import { useTranslator } from 'hooks';
import { getAnimalGroups } from 'lib/animals';
import { AnimalActivityGridGroup } from './AnimalActivityGridGroup';
import { AnimalActivityGridProps } from './types';
import styles from './AnimalActivityGrid.module.css';

export const AnimalActivityGrid = (props: AnimalActivityGridProps) => {
  const { animals } = props;

  // Retrieve application translator
  const translate = useTranslator();

  // Group animals by their tiers
  const animalGroups = useMemo(
    () => getAnimalGroups(animals, translate),
    [animals, translate],
  );

  return (
    <div className={styles.AnimalActivityGrid}>
      {animalGroups.map(group => (
        <AnimalActivityGridGroup group={group} key={group.tier} />
      ))}
    </div>
  );
};
