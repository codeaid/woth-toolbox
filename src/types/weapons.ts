export enum Brand {
  Remington = 'remington',
  Steyr = 'steyr',
  Stinger = 'stinger',
  Unknown = 'unknown',
}

export interface Weapon {
  brand: Brand;
  calibre: string;
  hitEnergy: [number, number, number, number, number]; // 50m, 100m, 150m, 200m, 300m
  model: string;
  tier: number;
}

export enum WeaponDistance {
  M50 = 50,
  M100 = 100,
  M150 = 150,
  M200 = 200,
  M300 = 300,
}

export interface WeaponGroup {
  tier: number;
  weapons: Array<Weapon>;
}