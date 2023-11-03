import { SectionHeader } from 'components/SectionHeader';
import { useTranslator } from 'hooks';
import { getTierKey } from 'lib/i18n';
import { PivotTableRows } from './PivotTableRows';
import type { Entity, EntityPivot, PivotTableGroupProps } from './types';

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

  // Retrieve application translator
  const translate = useTranslator();

  return (
    <>
      <SectionHeader>{translate(getTierKey(group.tier))}</SectionHeader>
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
