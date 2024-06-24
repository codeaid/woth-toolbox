import { fauna } from 'config/animals';
import en from 'locales';
import { type AnimalKey, trophyRangesMap } from './data/animals_trophy_ranges';

export default fauna.map(entry => {
  const trophy = trophyRangesMap.get(entry.heading as AnimalKey);

  return {
    ID: entry.heading,
    LATIN: en[entry.latin],
    MIN: entry.hitEnergy[0],
    MAX: entry.hitEnergy[1],
    TIER: entry.tier,
    ...(trophy !== null ? { TROPHY: trophy } : {}),
  };
});
