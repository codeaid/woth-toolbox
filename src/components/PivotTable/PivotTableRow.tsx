import { useMemo } from 'react';
import { WeaponDistance } from 'types/weapons';
import { PivotTableEnergyRating } from './PivotTableEnergyRating';
import { Entity, EntityPivot, PivotTableRowProps } from './types';
import styles from './PivotTableRow.module.css';

export const PivotTableRow = <
  TEntity extends Entity,
  TPivot extends EntityPivot<TEntity>,
>(
  props: PivotTableRowProps<TEntity, TPivot>,
) => {
  const {
    entity,
    pivot,
    onGetWeaponHitEnergy,
    onGetWeaponOptimal,
    onGetWeaponSuboptimal,
    onRenderEntityName,
  } = props;

  // Extract energy hit ratings
  const [m50, m100, m150, m200, m300] = onGetWeaponHitEnergy(entity, pivot);

  // Generate optimal distance flags
  const optimal50 = useMemo(
    () => onGetWeaponOptimal(entity, pivot, WeaponDistance.M50),
    [entity, onGetWeaponOptimal, pivot],
  );
  const optimal100 = useMemo(
    () => onGetWeaponOptimal(entity, pivot, WeaponDistance.M100),
    [entity, onGetWeaponOptimal, pivot],
  );
  const optimal150 = useMemo(
    () => onGetWeaponOptimal(entity, pivot, WeaponDistance.M150),
    [entity, onGetWeaponOptimal, pivot],
  );
  const optimal200 = useMemo(
    () => onGetWeaponOptimal(entity, pivot, WeaponDistance.M200),
    [entity, onGetWeaponOptimal, pivot],
  );
  const optimal300 = useMemo(
    () => onGetWeaponOptimal(entity, pivot, WeaponDistance.M300),
    [entity, onGetWeaponOptimal, pivot],
  );

  // Generate suboptimal distance flags
  const suboptimal50 = useMemo(
    () => onGetWeaponSuboptimal(entity, pivot, WeaponDistance.M50),
    [entity, onGetWeaponSuboptimal, pivot],
  );
  const suboptimal100 = useMemo(
    () => onGetWeaponSuboptimal(entity, pivot, WeaponDistance.M100),
    [entity, onGetWeaponSuboptimal, pivot],
  );
  const suboptimal150 = useMemo(
    () => onGetWeaponSuboptimal(entity, pivot, WeaponDistance.M150),
    [entity, onGetWeaponSuboptimal, pivot],
  );
  const suboptimal200 = useMemo(
    () => onGetWeaponSuboptimal(entity, pivot, WeaponDistance.M200),
    [entity, onGetWeaponSuboptimal, pivot],
  );
  const suboptimal300 = useMemo(
    () => onGetWeaponSuboptimal(entity, pivot, WeaponDistance.M300),
    [entity, onGetWeaponSuboptimal, pivot],
  );

  // Flag indicating that all distances are optimal
  const isAllOptimal =
    optimal50 && optimal100 && optimal150 && optimal200 && optimal300;

  return (
    <div className={styles.PivotTableRow}>
      <div className={styles.PivotTableRowName}>
        {onRenderEntityName(entity, isAllOptimal)}
      </div>

      <div className={styles.PivotTableRowRatings}>
        <PivotTableEnergyRating
          optimal={optimal50}
          suboptimal={suboptimal50}
          value={m50}
        />
        <PivotTableEnergyRating
          optimal={optimal100}
          suboptimal={suboptimal100}
          value={m100}
        />
        <PivotTableEnergyRating
          optimal={optimal150}
          suboptimal={suboptimal150}
          value={m150}
        />
        <PivotTableEnergyRating
          optimal={optimal200}
          suboptimal={suboptimal200}
          value={m200}
        />
        <PivotTableEnergyRating
          optimal={optimal300}
          suboptimal={suboptimal300}
          value={m300}
        />
      </div>
    </div>
  );
};
