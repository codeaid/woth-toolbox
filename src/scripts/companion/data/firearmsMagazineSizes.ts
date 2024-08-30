import type { TranslationKey } from 'types/i18n';

type Filtered<T> = T extends `WEAPON:${infer _}_HEADING` ? T : never;
export type WeaponKey = Filtered<TranslationKey>;

export const magazineSizesMap = new Map<WeaponKey, number>([
  ['WEAPON:CROSSBOW_01_HEADING', 1],
  ['WEAPON:CROSSBOW_02_HEADING', 1],
  ['WEAPON:CROSSBOW_03_HEADING', 1],
  ['WEAPON:CROSSBOW_04_HEADING', 1],
  ['WEAPON:BOW_01_HEADING', 1],
  ['WEAPON:BOW_02_HEADING', 1],
  ['WEAPON:BOW_03_HEADING', 1],
  ['WEAPON:BOW_04_HEADING', 1],
  ['WEAPON:RIFLE_BOLT_01_HEADING', 4],
  ['WEAPON:RIFLE_BOLT_02_HEADING', 4],
  ['WEAPON:RIFLE_BOLT_04_HEADING', 4],
  ['WEAPON:RIFLE_BOLT_05_HEADING', 5],
  ['WEAPON:RIFLE_BOLT_06_HEADING', 4],
  ['WEAPON:RIFLE_BOLT_06_02_HEADING', 4],
  ['WEAPON:RIFLE_BOLT_07_HEADING', 3],
  ['WEAPON:RIFLE_BOLT_08_HEADING', 5],
  ['WEAPON:RIFLE_BOLT_09_HEADING', 3],
  ['WEAPON:RIFLE_BOLT_09_FULLSTOCK_01_HEADING', 4],
  ['WEAPON:RIFLE_BOLT_11_HEADING', 3],
  ['WEAPON:RIFLE_BOLT_12_HEADING', 3],
  ['WEAPON:RIFLE_BOLT_14_HEADING', 5],
  ['WEAPON:RIFLE_BOLT_17_HEADING', 10],
  ['WEAPON:RIFLE_BOLT_19_HEADING', 4],
  ['WEAPON:RIFLE_LEVER_01_HEADING', 6],
  ['WEAPON:RIFLE_PUMP_01_HEADING', 4],
  ['WEAPON:RIFLE_SEMI_01_HEADING', 10],
  ['WEAPON:SHOTGUN_BREAK_01_HEADING', 2],
  ['WEAPON:SHOTGUN_BREAK_02_HEADING', 2],
  ['WEAPON:SHOTGUN_BREAK_03_HEADING', 2],
  ['WEAPON:SHOTGUN_PUMP_01_HEADING', 4],
  ['WEAPON:SHOTGUN_SEMI_01_HEADING', 4],
  ['WEAPON:SHOTGUN_SEMI_02_HEADING', 3],
]);