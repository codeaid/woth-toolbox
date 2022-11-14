import { Brand, Weapon } from 'types/weapons';

export const weapons: Array<Weapon> = [
  // Tier 2
  {
    brand: Brand.Steyr,
    calibre: '.22 LR',
    hitEnergy: [154, 138, 124, 114, 99],
    id: 'steyr-zephyr-ii',
    model: 'Zephyr II',
    tier: 2,
  },
  {
    brand: Brand.Stinger,
    calibre: '.22 LR',
    hitEnergy: [154, 138, 124, 114, 99],
    id: 'stinger-22',
    model: '22',
    tier: 2,
  },

  // Tier 3
  {
    brand: Brand.Steyr,
    calibre: '.223 Win',
    hitEnergy: [1608, 1550, 1485, 1423, 1313],
    id: 'steyr-scout',
    model: 'Scout',
    tier: 3,
  },

  // Tier 4
  {
    brand: Brand.Unknown,
    calibre: '30-30 Win',
    hitEnergy: [1658, 1553, 1445, 1346, 1170],
    id: 'grandpas-old-rifle',
    model: "Grandpa's Old Rifle",
    tier: 4,
  },

  // Tier 5
  {
    brand: Brand.Remington,
    calibre: '.243 Win',
    hitEnergy: [2948, 2832, 2699, 2578, 2360],
    id: 'remington-783',
    model: '783',
    tier: 5,
  },
  {
    brand: Brand.Steyr,
    calibre: '.243 Win',
    hitEnergy: [2948, 2832, 2698, 2578, 2334],
    id: 'steyr-pro-hunter',
    model: 'Pro Hunter',
    tier: 5,
  },
  {
    brand: Brand.Steyr,
    calibre: '7mm-08 Rem',
    hitEnergy: [3066, 2971, 2867, 2774, 2597],
    id: 'steyr-pro-hunter-ii',
    model: 'Pro Hunter II',
    tier: 5,
  },
  {
    brand: Brand.Steyr,
    calibre: '.308 Win',
    hitEnergy: [3468, 3382, 3288, 3203, 3041],
    id: 'steyr-monoblock',
    model: 'Monoblock',
    tier: 5,
  },
  {
    brand: Brand.Remington,
    calibre: '.270 Win',
    hitEnergy: [3600, 3541, 3479, 3418, 3310],
    id: 'remington-7600',
    model: '7600',
    tier: 5,
  },
  {
    brand: Brand.Remington,
    calibre: '.30-06',
    hitEnergy: [3755, 3630, 3494, 3381, 3239],
    id: 'remington-1903',
    model: '1903',
    tier: 5,
  },

  // Tier 6
  {
    brand: Brand.Remington,
    calibre: '.350 Rem Mag',
    hitEnergy: [4416, 4238, 4045, 3861, 3525],
    id: 'remington-673-guide-rifle',
    model: '673 Guide Rifle',
    tier: 6,
  },
  {
    brand: Brand.Steyr,
    calibre: '.300 Win Mag',
    hitEnergy: [4653, 4559, 4455, 4360, 4177],
    id: 'steyr-sm12',
    model: 'SM12',
    tier: 6,
  },
  {
    brand: Brand.Remington,
    calibre: '.300 Win Mag',
    hitEnergy: [4655, 4559, 4455, 4360, 4176],
    id: 'remington-700-long-range',
    model: '700 Long Range',
    tier: 6,
  },
  {
    brand: Brand.Steyr,
    calibre: '.338 Lapua Mag',
    hitEnergy: [5989, 5872, 5755, 5637, 5409],
    id: 'steyr-carbon-cl-ii',
    model: 'Carbon CL II',
    tier: 6,
  },
];
