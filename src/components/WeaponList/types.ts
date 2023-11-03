import type { EntityGroup } from 'types/generic';
import type { Weapon } from 'types/weapons';

type WeaponListItemClickHandler = (weapon: Weapon) => void;

export interface WeaponListGroupProps {
  group: EntityGroup<Weapon>;
  selected?: Weapon;
  onWeaponClick: WeaponListItemClickHandler;
}

export interface WeaponListItemProps {
  active?: boolean;
  weapon: Weapon;
  onClick: WeaponListItemClickHandler;
}

export interface WeaponListProps {
  selected?: Weapon;
  weapons: Array<Weapon>;
  onWeaponClick: WeaponListItemClickHandler;
}
