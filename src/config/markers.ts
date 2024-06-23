import type {
  MarkerType,
  MarkerTypeAnimal,
  MarkerTypeCustom,
  MarkerTypeGeneric,
  MarkerTypeNeedZone,
} from 'types/markers';

// List of types representing animal markers
export const animalMarkerTypes: Array<MarkerTypeAnimal> = [
  'animal:alaska moose',
  'animal:american badger',
  'animal:american black bear',
  'animal:barren-ground caribou',
  'animal:bighorn sheep',
  'animal:black wildebeest',
  'animal:blue wildebeest',
  'animal:brown bear',
  'animal:cape buffalo',
  'animal:chamois',
  'animal:common warthog',
  'animal:egyptian goose',
  'animal:eurasian badger',
  'animal:european hare',
  'animal:european rabbit',
  'animal:fallow deer',
  'animal:feral goat',
  'animal:feral pig',
  'animal:gemsbok',
  'animal:golden jackal',
  'animal:gray wolf',
  'animal:greater kudu',
  'animal:greylag goose',
  'animal:helmeted guineafowl',
  'animal:himalayan tahr',
  'animal:honey badger',
  'animal:kodiak bear',
  'animal:lesser scaup',
  'animal:lion',
  'animal:mouflon',
  'animal:mountain goat',
  'animal:mule deer',
  'animal:pheasant',
  'animal:red deer',
  'animal:red fox',
  'animal:red stag',
  'animal:rocky mountain elk',
  'animal:roe deer',
  'animal:roosevelt elk',
  'animal:ross goose',
  'animal:sambar deer',
  'animal:sika deer',
  'animal:sitka deer',
  'animal:snowshoe hare',
  'animal:spotted hyena',
  'animal:springbok',
  'animal:surf scoter',
  'animal:western moose',
  'animal:white-tailed deer',
  'animal:wild boar',
  'animal:wild duck',
  'animal:wood bison',
];

// List of marker types that represent custom markers
export const customMarkerTypes: Array<MarkerTypeCustom> = [
  'marker:exploration',
  'marker:level area',
  'marker:tracking',
];

// List of marker types that represent generic markers
export const genericMarkerTypes: Array<MarkerTypeGeneric> = [
  'cabin',
  'cabin:undiscovered',
  'camp',
  'echo',
  'flower',
  'hunting stand',
  'lodge',
  'parking',
  'photo',
  'race',
  'shooting range',
  'stamp',
  'swing',
  'view',
];

// List of marker types that represent need zones
export const needZoneMarkerTypes: Array<MarkerTypeNeedZone> = [
  'zone:drink',
  'zone:eat',
  'zone:sleep',
];

// Map of marker types and their maximum map scale visibility
export const markerVisibilityMap = new Map(
  animalMarkerTypes
    .reduce(
      (acc, type) => acc.concat([[type, 0.55]]),
      [] as Array<[MarkerType, number]>,
    )
    .concat([
      ['cabin', 0.25],
      ['camp', 0.25],
      ['echo', 0.35],
      ['flower', 0.35],
      ['hunting stand', 0.45],
      ['parking', 0.3],
      ['photo', 0.35],
      ['race', 0.25],
      ['shooting range', 0.25],
      ['stamp', 0.35],
      ['swing', 0.35],
      ['view', 0.35],
      ['zone:drink', 0.65],
      ['zone:eat', 0.65],
      ['zone:sleep', 0.65],
    ]),
);

// Maximum number of tracking markers that can exist on the map
export const maxTrackingMarkerCount = 1000;
