import { Animal, AnimalActivity } from 'types/animals';

export default [
  {
    description: 'ANIMAL:LEPUS_EUROPAEUS_DESCRIPTION',
    habitatPrimary: ['grassland'],
    heading: 'ANIMAL:LEPUS_EUROPAEUS_HEADING',
    hitEnergy: [356, 1068],
    latin: 'ANIMAL:LEPUS_EUROPAEUS_LATIN',
    lifeCycle: [
      { activity: AnimalActivity.Feeding, time: 0 },
      { activity: AnimalActivity.Sleeping, time: 3 },
      { activity: AnimalActivity.Feeding, time: 9 },
      { activity: AnimalActivity.Sleeping, time: 17 },
    ],
    maps: ['transylvania'],
    slug: 'european-hare',
    tier: 1,
    type: 'animal:european hare',
  },
  {
    description: 'ANIMAL:LEPUS_AMERICANUS_DESCRIPTION',
    habitatPrimary: ['highland forest'],
    heading: 'ANIMAL:LEPUS_AMERICANUS_HEADING',
    hitEnergy: [56, 628],
    latin: 'ANIMAL:LEPUS_AMERICANUS_LATIN',
    lifeCycle: [
      { activity: AnimalActivity.Feeding, time: 0 },
      { activity: AnimalActivity.Sleeping, time: 3 },
      { activity: AnimalActivity.Feeding, time: 9 },
      { activity: AnimalActivity.Sleeping, time: 17 },
    ],
    maps: ['alaska', 'idaho'],
    slug: 'snowshoe-hare',
    tier: 1,
    type: 'animal:snowshoe hare',
  },
] as Array<Animal>;
