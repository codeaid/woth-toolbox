import type { Weapon } from 'types/weapons';

export default [
  {
    action: 'WEAPON:RIFLE_BOLT_08_ACTION',
    caliber: 'WEAPON:RIFLE_BOLT_08_CALIBER',
    description: 'WEAPON:RIFLE_BOLT_08_DESCRIPTION',
    heading: 'WEAPON:RIFLE_BOLT_08_HEADING',
    hitEnergy: [155, 140, 125, 115, 100],
    slug: 'steyr-zephyr-ii',
    tier: 2,
  },
  {
    action: 'WEAPON:RIFLE_SEMI_01_ACTION',
    caliber: 'WEAPON:RIFLE_SEMI_01_CALIBER',
    description: 'WEAPON:RIFLE_SEMI_01_DESCRIPTION',
    heading: 'WEAPON:RIFLE_SEMI_01_HEADING',
    hitEnergy: [155, 140, 125, 115, 100],
    slug: 'stinger-22',
    tier: 2,
  },
] as Array<Weapon>;
