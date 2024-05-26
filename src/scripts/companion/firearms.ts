import { weapons } from 'config/weapons';
import type { TranslationKey } from 'types/i18n';

type Filtered<T> = T extends `WEAPON:${infer _}_HEADING` ? T : never;
type WeaponKey = Filtered<TranslationKey>;

const magSizeMap = new Map<WeaponKey, number>([
  ['WEAPON:CROSSBOW_03_HEADING', 1],
  // To be populated with the remaining entries...
]);

export default weapons.map(entry => ({
  ID: entry.heading,
  ACTION: entry.action,
  CALIBER: entry.caliber,
  ENERGY: entry.hitEnergy,
  MAG: magSizeMap.get(entry.heading as WeaponKey) ?? -1,
  TIER: entry.tier,
}));
