import { useMemo } from 'react';
import { PivotTableGroup } from './PivotTableGroup';
import { PivotTableHeader } from './PivotTableHeader';
import type { Entity, EntityPivot, PivotTableProps } from './types';
import styles from './PivotTable.module.css';

export const PivotTable = <
  TEntity extends Entity,
  TPivot extends EntityPivot<TEntity>,
>(
  props: PivotTableProps<TEntity, TPivot>,
) => {
  const {
    entities,
    pivot,
    onGetEntityGroups,
    onGetWeaponHitEnergy,
    onGetWeaponOptimal,
    onGetWeaponSuboptimal,
    onRenderEntityName,
  } = props;

  // Group animals by their tiers
  const groups = useMemo(
    () => onGetEntityGroups(entities),
    [entities, onGetEntityGroups],
  );

  return (
    <div className={styles.PivotTable}>
      <PivotTableHeader />

      {groups.map(group => (
        <PivotTableGroup<TEntity, TPivot>
          group={group}
          key={group.tier}
          pivot={pivot}
          onGetWeaponHitEnergy={onGetWeaponHitEnergy}
          onGetWeaponOptimal={onGetWeaponOptimal}
          onGetWeaponSuboptimal={onGetWeaponSuboptimal}
          onRenderEntityName={onRenderEntityName}
        />
      ))}
    </div>
  );
};
