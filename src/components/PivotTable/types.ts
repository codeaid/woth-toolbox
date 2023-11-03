import type { ReactNode } from 'react';
import type { Animal } from 'types/animals';
import type { EntityGroup } from 'types/generic';
import type {
  Weapon,
  WeaponDistance,
  WeaponEnergyRatings,
  WeaponEnergyValue,
} from 'types/weapons';

// Base entity and opposite entity selector types
export type Entity = Animal | Weapon;
export type EntityPivot<TEntity extends Entity> = TEntity extends Animal
  ? Weapon
  : Animal;

type PivotTableEntityGroupGenerator<T> = (
  entities: Array<T>,
) => Array<EntityGroup<T>>;

type PivotTableEntityNameRenderer<T> = (
  entity: T,
  highlighted: boolean,
) => ReactNode;

type PivotTableHitEnergyHandler<
  TEntity extends Entity,
  TPivot extends EntityPivot<TEntity>,
> = (entity: TEntity, pivot: TPivot) => WeaponEnergyRatings;

type PivotTableHitEnergyValidator<
  TEntity extends Entity,
  TPivot extends EntityPivot<TEntity>,
> = (entity: TEntity, pivot: TPivot, distance: WeaponDistance) => boolean;

export interface PivotTableEnergyRatingProps {
  optimal?: boolean;
  suboptimal?: boolean;
  value: WeaponEnergyValue;
}

export interface PivotTableGroupProps<
  TEntity extends Entity,
  TPivot extends EntityPivot<TEntity>,
> {
  group: EntityGroup<TEntity>;
  pivot: TPivot;
  onGetWeaponHitEnergy: PivotTableHitEnergyHandler<TEntity, TPivot>;
  onGetWeaponOptimal: PivotTableHitEnergyValidator<TEntity, TPivot>;
  onGetWeaponSuboptimal: PivotTableHitEnergyValidator<TEntity, TPivot>;
  onRenderEntityName: PivotTableEntityNameRenderer<TEntity>;
}

export interface PivotTableProps<
  TEntity extends Entity,
  TPivot extends EntityPivot<TEntity>,
> {
  entities: Array<TEntity>;
  pivot: TPivot;
  onGetEntityGroups: PivotTableEntityGroupGenerator<TEntity>;
  onGetWeaponHitEnergy: PivotTableHitEnergyHandler<TEntity, TPivot>;
  onGetWeaponOptimal: PivotTableHitEnergyValidator<TEntity, TPivot>;
  onGetWeaponSuboptimal: PivotTableHitEnergyValidator<TEntity, TPivot>;
  onRenderEntityName: PivotTableEntityNameRenderer<TEntity>;
}

export interface PivotTableRowProps<
  TEntity extends Entity,
  TPivot extends EntityPivot<TEntity>,
> {
  entity: TEntity;
  pivot: TPivot;
  onGetWeaponHitEnergy: PivotTableHitEnergyHandler<TEntity, TPivot>;
  onGetWeaponOptimal: PivotTableHitEnergyValidator<TEntity, TPivot>;
  onGetWeaponSuboptimal: PivotTableHitEnergyValidator<TEntity, TPivot>;
  onRenderEntityName: PivotTableEntityNameRenderer<TEntity>;
}

export interface PivotTableRowsProps<
  TEntity extends Entity,
  TPivot extends EntityPivot<TEntity>,
> {
  entities: Array<TEntity>;
  pivot: TPivot;
  onGetWeaponHitEnergy: PivotTableHitEnergyHandler<TEntity, TPivot>;
  onGetWeaponOptimal: PivotTableHitEnergyValidator<TEntity, TPivot>;
  onGetWeaponSuboptimal: PivotTableHitEnergyValidator<TEntity, TPivot>;
  onRenderEntityName: PivotTableEntityNameRenderer<TEntity>;
}
