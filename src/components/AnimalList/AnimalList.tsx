import { useMemo } from 'react';
import { getAnimalGroups } from 'lib/animals';
import { AnimalListGroup } from './AnimalListGroup';
import { AnimalListProps } from './types';
import styles from './AnimalList.module.css';

export const AnimalList = (props: AnimalListProps) => {
  const { animals, selected, onAnimalClick } = props;

  // Group animals by their tiers
  const animalGroups = useMemo(() => getAnimalGroups(animals), [animals]);

  return (
    <ul className={styles.AnimalList}>
      {animalGroups.map(group => (
        <AnimalListGroup
          group={group}
          key={group.tier}
          selected={selected}
          onAnimalClick={onAnimalClick}
        />
      ))}
    </ul>
  );
};
