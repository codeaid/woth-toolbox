import { useMemo, useState } from 'react';
import { useTranslator } from 'hooks';
import { getAnimalGroups, getAnimalsByMapType } from 'lib/animals';
import type { MapType } from 'types/cartography';
import { AnimalActivityGridFilter } from './AnimalActivityGridFilter';
import { AnimalActivityGridGroup } from './AnimalActivityGridGroup';
import type { AnimalActivityGridProps } from './types';
import styles from './AnimalActivityGrid.module.css';

export const AnimalActivityGrid = (props: AnimalActivityGridProps) => {
  const { animals } = props;

  const [mapType, setMapType] = useState<Optional<MapType>>(undefined);

  // Retrieve application translator
  const translate = useTranslator();

  const selectedAnimals = useMemo(
    () => getAnimalsByMapType(animals, mapType),
    [animals, mapType],
  );

  // Group animals by their tiers
  const animalGroups = useMemo(
    () => getAnimalGroups(selectedAnimals, translate),
    [selectedAnimals, translate],
  );

  return (
    <div className={styles.AnimalActivityGrid}>
      <AnimalActivityGridFilter mapType={mapType} onChange={setMapType} />

      {animalGroups.map(group => (
        <AnimalActivityGridGroup group={group} key={group.tier} />
      ))}
    </div>
  );
};
