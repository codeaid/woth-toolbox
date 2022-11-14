import { Weapon, WeaponGroup } from 'types/weapons';

type WeaponListItemClickHandler = (weapon: Weapon) => void;

export interface WeaponListGroupProps {
  group: WeaponGroup;
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
