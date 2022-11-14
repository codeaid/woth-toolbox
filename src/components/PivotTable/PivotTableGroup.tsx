import { SectionHeader } from 'components/SectionHeader';
import { PivotTableRows } from './PivotTableRows';
import { Entity, EntityPivot, PivotTableGroupProps } from './types';

export const PivotTableGroup = <
  TEntity extends Entity,
  TPivot extends EntityPivot<TEntity>,
>(
  props: PivotTableGroupProps<TEntity, TPivot>,
) => {
  const {
    group,
    pivot,
    onGetWeaponHitEnergy,
    onGetWeaponOptimal,
    onGetWeaponSuboptimal,
    onRenderEntityName,
  } = props;

  return (
    <>
      <SectionHeader>{`Tier ${group.tier}`}</SectionHeader>
      <PivotTableRows<TEntity, TPivot>
        entities={group.entities}
        pivot={pivot}
        onGetWeaponHitEnergy={onGetWeaponHitEnergy}
        onGetWeaponOptimal={onGetWeaponOptimal}
        onGetWeaponSuboptimal={onGetWeaponSuboptimal}
        onRenderEntityName={onRenderEntityName}
      />
    </>
  );
};
