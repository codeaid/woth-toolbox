import { PivotTableRow } from './PivotTableRow';
import type { Entity, EntityPivot, PivotTableRowsProps } from './types';
import styles from './PivotTableRows.module.css';

export const PivotTableRows = <
  TEntity extends Entity,
  TPivot extends EntityPivot<TEntity>,
>(
  props: PivotTableRowsProps<TEntity, TPivot>,
) => {
  const {
    entities,
    pivot,
    onRenderEntityName,
    onGetWeaponHitEnergy,
    onGetWeaponOptimal,
    onGetWeaponSuboptimal,
  } = props;

  return (
    <div className={styles.PivotTableRows}>
      {entities.map(entity => (
        <PivotTableRow
          entity={entity}
          key={entity.slug}
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
