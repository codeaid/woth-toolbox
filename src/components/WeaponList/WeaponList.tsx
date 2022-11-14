import { useMemo } from 'react';
import { getWeaponGroups } from 'lib/weapons';
import { WeaponListGroup } from './WeaponListGroup';
import { WeaponListProps } from './types';
import styles from './WeaponList.module.css';

export const WeaponList = (props: WeaponListProps) => {
  const { weapons, selected, onWeaponClick } = props;

  // Group weapons by their tiers
  const weaponGroups = useMemo(() => getWeaponGroups(weapons), [weapons]);

  return (
    <ul className={styles.WeaponList}>
      {weaponGroups.map(group => (
        <WeaponListGroup
          group={group}
          key={group.tier}
          selected={selected}
          onWeaponClick={onWeaponClick}
        />
      ))}
    </ul>
  );
};
