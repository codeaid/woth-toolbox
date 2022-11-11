import { Animal } from 'types/animals';
import { Weapon, WeaponGroup } from 'types/weapons';

export interface WeaponGridEnergyItemProps {
  optimal?: boolean;
  suboptimal?: boolean;
  value: number;
}

export interface WeaponGridProps {
  animal: Animal;
  weapons: Array<Weapon>;
}

export interface WeaponGridGroupProps {
  animal: Animal;
  group: WeaponGroup;
}

export interface WeaponGridRowProps {
  animal: Animal;
  weapon: Weapon;
}

export interface WeaponGridRowsProps {
  animal: Animal;
  weapons: Array<Weapon>;
}
