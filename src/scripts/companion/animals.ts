import { fauna } from 'config/animals';
import en from 'locales';
import type { TranslationKey } from 'types/i18n';

type Filtered<T> = T extends `ANIMAL:${infer _}_HEADING` ? T : never;
type AnimalKey = Filtered<TranslationKey>;

const trophyMap = new Map<AnimalKey, [number, number, number, number]>([
  ['ANIMAL:ALCES_AMERICANUS_HEADING', [284, 361, 411, 459]],
  // To be populated with the remaining entries...
]);

export default fauna.map(entry => ({
  ID: entry.heading,
  LATIN: en[entry.latin],
  MIN: entry.hitEnergy[0],
  MAX: entry.hitEnergy[1],
  TIER: entry.tier,
  TROPHY: trophyMap.get(entry.heading as AnimalKey) ?? [],
}));
