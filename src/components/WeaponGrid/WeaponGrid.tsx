import { useMemo } from 'react';
import { getWeaponGroups } from 'lib/weapons';
import { WeaponGridGroup } from './WeaponGridGroup';
import { WeaponGridHeader } from "./WeaponGridHeader";
import { WeaponGridProps } from './types';
import styles from './WeaponGrid.module.css';

export const WeaponGrid = (props: WeaponGridProps) => {
  const { animal, weapons } = props;

  // Group weapons by their tiers
  const weaponGroups = useMemo(() => getWeaponGroups(weapons), [weapons]);

  return (
    <div className={styles.WeaponGrid}>
      <WeaponGridHeader />

      {weaponGroups.map(group => (
        <WeaponGridGroup animal={animal} group={group} key={group.tier} />
      ))}
    </div>
  );
};
