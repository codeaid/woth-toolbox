import type { Animal } from 'types/animals';

export default [
  {
    description: 'ANIMAL:TAXIDEA_TAXUS_DESCRIPTION',
    habitatPrimary: ['lowland forest', 'grassland'],
    habitatSecondary: ['highland forest'],
    heading: 'ANIMAL:TAXIDEA_TAXUS_HEADING',
    hitEnergy: [612, 1836],
    latin: 'ANIMAL:TAXIDEA_TAXUS_LATIN',
    lifeCycle: [
      { activity: 'sleeping', time: 0 },
      { activity: 'feeding', time: 3 },
      { activity: 'drinking', time: 7 },
      { activity: 'sleeping', time: 10 },
      { activity: 'feeding', time: 15 },
      { activity: 'drinking', time: 19 },
    ],
    maps: ['idaho'],
    slug: 'american-badger',
    tier: 3,
    type: 'animal:american badger',
  },
  {
    description: 'ANIMAL:ARCTIC_FOX_DESCRIPTION',
    habitatPrimary: ['highlands'],
    habitatSecondary: ['highland forests and grasslands'],
    heading: 'ANIMAL:ARCTIC_FOX_HEADING',
    hitEnergy: [580, 1720],
    latin: 'ANIMAL:ARCTIC_FOX_LATIN',
    lifeCycle: [
      { activity: 'sleeping', time: 2 },
      { activity: 'feeding', time: 5 },
      { activity: 'drinking', time: 9 },
      { activity: 'sleeping', time: 12 },
      { activity: 'feeding', time: 17 },
      { activity: 'drinking', time: 21 },
    ],
    maps: ['lintukoto'],
    slug: 'arctic-fox',
    tier: 3,
    type: 'animal:arctic fox',
  },
  {
    description: 'ANIMAL:MELES_MELES_DESCRIPTION',
    habitatPrimary: ['highland forest'],
    habitatSecondary: ['lowland forest'],
    heading: 'ANIMAL:MELES_MELES_HEADING',
    hitEnergy: [700, 2100],
    latin: 'ANIMAL:MELES_MELES_LATIN',
    lifeCycle: [
      { activity: 'sleeping', time: 0 },
      { activity: 'feeding', time: 3 },
      { activity: 'drinking', time: 7 },
      { activity: 'sleeping', time: 10 },
      { activity: 'feeding', time: 15 },
      { activity: 'drinking', time: 19 },
    ],
    maps: ['lintukoto', 'transylvania'],
    slug: 'eurasian-badger',
    tier: 3,
    type: 'animal:eurasian badger',
  },
  {
    description: 'ANIMAL:EURASIAN_WOLVERINE_DESCRIPTION',
    habitatPrimary: ['lowland forest'],
    habitatSecondary: ['swamps'],
    heading: 'ANIMAL:EURASIAN_WOLVERINE_HEADING',
    hitEnergy: [783, 2327],
    latin: 'ANIMAL:EURASIAN_WOLVERINE_LATIN',
    lifeCycle: [
      { activity: 'feeding', time: 0 },
      { activity: 'sleeping', time: 8 },
      { activity: 'feeding', time: 15 },
      { activity: 'sleeping', time: 18 },
    ],
    maps: ['lintukoto'],
    slug: 'eurasian-wolverine',
    tier: 3,
    type: 'animal:eurasian wolverine',
  },
  {
    description: 'ANIMAL:HONEY_BADGER_DESCRIPTION',
    habitatPrimary: ['arid savannah and desert', 'highlands'],
    heading: 'ANIMAL:HONEY_BADGER_HEADING',
    hitEnergy: [725, 1950],
    latin: 'ANIMAL:HONEY_BADGER_LATIN',
    lifeCycle: [
      { activity: 'feeding', time: 0 },
      { activity: 'sleeping', time: 8 },
      { activity: 'feeding', time: 15 },
      { activity: 'sleeping', time: 18 },
    ],
    maps: ['africa'],
    slug: 'honey-badger',
    tier: 3,
    type: 'animal:honey badger',
  },
  {
    description: 'ANIMAL:VULPES_VULPES_DESCRIPTION',
    habitatPrimary: ['grassland', 'lowland forest'],
    habitatSecondary: ['highland forest'],
    heading: 'ANIMAL:VULPES_VULPES_HEADING',
    hitEnergy: [612, 1836],
    latin: 'ANIMAL:VULPES_VULPES_LATIN',
    lifeCycle: [
      { activity: 'sleeping', time: 2 },
      { activity: 'feeding', time: 5 },
      { activity: 'drinking', time: 9 },
      { activity: 'sleeping', time: 12 },
      { activity: 'feeding', time: 17 },
      { activity: 'drinking', time: 21 },
    ],
    maps: ['alaska', 'idaho', 'lintukoto', 'transylvania'],
    slug: 'red-fox',
    tier: 3,
    type: 'animal:red fox',
  },
] as Array<Animal>;
