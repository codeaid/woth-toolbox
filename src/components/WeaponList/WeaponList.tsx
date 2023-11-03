import { useMemo } from 'react';
import { useTranslator } from 'hooks';
import { getWeaponGroups } from 'lib/weapons';
import { WeaponListGroup } from './WeaponListGroup';
import type { WeaponListProps } from './types';
import styles from './WeaponList.module.css';

export const WeaponList = (props: WeaponListProps) => {
  const { weapons, selected, onWeaponClick } = props;

  // Retrieve application translator
  const translate = useTranslator();

  // Group weapons by their tiers
  const weaponGroups = useMemo(
    () => getWeaponGroups(weapons, translate),
    [translate, weapons],
  );

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
