import type { Weapon } from 'types/weapons';

type WeaponNameResponsiveType = 'mobile' | 'tablet';

export interface WeaponNameProps {
  highlighted?: boolean;
  responsive?: WeaponNameResponsiveType;
  weapon: Weapon;
}
