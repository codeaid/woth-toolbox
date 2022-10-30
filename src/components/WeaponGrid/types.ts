import { Animal } from 'types/animals';
import { Weapon } from 'types/weapons';

export interface WeaponGridProps {
  animal: Animal;
  weapons: Array<Weapon>;
}
