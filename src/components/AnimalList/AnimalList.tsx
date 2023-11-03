import { useMemo } from 'react';
import { useTranslator } from 'hooks';
import { getAnimalGroups } from 'lib/animals';
import { AnimalListGroup } from './AnimalListGroup';
import type { AnimalListProps } from './types';
import styles from './AnimalList.module.css';

export const AnimalList = (props: AnimalListProps) => {
  const { animals, selected, onAnimalClick } = props;

  // Retrieve application translator
  const translate = useTranslator();

  // Group animals by their tiers
  const animalGroups = useMemo(
    () => getAnimalGroups(animals, translate),
    [animals, translate],
  );

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
