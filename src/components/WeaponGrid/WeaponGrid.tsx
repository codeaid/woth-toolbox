import { useMemo } from 'react';
import { getWeaponGroups } from 'lib/weapons';
import { WeaponGridGroup } from './WeaponGridGroup';
import { WeaponGridProps } from './types';
import styles from './WeaponGrid.module.css';

export const WeaponGrid = (props: WeaponGridProps) => {
  const { animal, weapons } = props;

  // Group weapons by their tiers
  const weaponGroups = useMemo(() => getWeaponGroups(weapons), [weapons]);

  return (
    <div className={styles.WeaponGrid}>
      <div className={styles.WeaponGridHeader}>
        <div className={styles.WeaponGridHeaderDistance}>50m</div>
        <div className={styles.WeaponGridHeaderDistance}>100m</div>
        <div className={styles.WeaponGridHeaderDistance}>150m</div>
        <div className={styles.WeaponGridHeaderDistance}>200m</div>
        <div className={styles.WeaponGridHeaderDistance}>300m</div>
      </div>

      {weaponGroups.map(group => (
        <WeaponGridGroup animal={animal} group={group} key={group.tier} />
      ))}
    </div>
  );
};
