import type { TranslationKey } from 'types/i18n';

export interface Weapon {
  action: TranslationKey;
  caliber?: TranslationKey;
  description: TranslationKey;
  heading: TranslationKey;
  hitEnergy: WeaponEnergyRatings;
  slug: string;
  tier: number;
}

export type WeaponDistance = '50m' | '100m' | '150m' | '200m' | '300m';

// 50m, 100m, 150m, 200m, 300m
export type WeaponEnergyRatings = [
  WeaponEnergyValue,
  WeaponEnergyValue,
  WeaponEnergyValue,
  WeaponEnergyValue,
  WeaponEnergyValue,
];

export type WeaponEnergyValue = number | undefined;
