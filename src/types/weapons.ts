import { TranslationKey } from 'types/i18n';

export interface Weapon {
  action: TranslationKey;
  caliber: TranslationKey;
  description: TranslationKey;
  heading: TranslationKey;
  hitEnergy: [number, number, number, number, number]; // 50m, 100m, 150m, 200m, 300m
  slug: string;
  tier: number;
}

export enum WeaponDistance {
  M50 = 50,
  M100 = 100,
  M150 = 150,
  M200 = 200,
  M300 = 300,
}
