import { weapons } from 'config/weapons';
import type { WeaponKey } from './data/firearmsMagazineSizes';
import { magazineSizesMap } from './data/firearmsMagazineSizes';

export default weapons.map(entry => {
  const caliber = entry.heading.startsWith('WEAPON:BOW')
    ? 'WEAPON:BOW_00_CALIBER'
    : entry.caliber;
  const magazineSize = magazineSizesMap.get(entry.heading as WeaponKey) ?? -1;

  return {
    ID: entry.heading,
    ACTION: entry.action,
    CALIBER: caliber,
    ...(entry.hitEnergy.every(value => value === 0)
      ? {}
      : { ENERGY: entry.hitEnergy }),
    MAG: magazineSize,
    TIER: entry.tier,
  };
});
