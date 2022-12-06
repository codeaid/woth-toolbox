import {
  AnimalMarkerType,
  GenericMarkerType,
  MarkerType,
  NeedZoneMarkerType,
} from 'types/markers';

// List of types representing animal markers
export const animalMarkerTypes: Array<AnimalMarkerType> = [
  'animal:american badger',
  'animal:american black bear',
  'animal:bighorn sheep',
  'animal:brown bear',
  'animal:chamois',
  'animal:elk',
  'animal:eurasian badger',
  'animal:european hare',
  'animal:fallow deer',
  'animal:golden jackal',
  'animal:gray wolf',
  'animal:greylag goose',
  'animal:lesser scaup',
  'animal:moose',
  'animal:mouflon',
  'animal:mountain goat',
  'animal:mule deer',
  'animal:pheasant',
  'animal:red deer',
  'animal:red fox',
  'animal:roe deer',
  'animal:ross goose',
  'animal:showshoe hare',
  'animal:white-tailed deer',
  'animal:wild boar',
  'animal:wild duck',
];

// List of marker types that represent generic markers
export const genericMarkerTypes: Array<GenericMarkerType> = [
  'cabin',
  'cabin:undiscovered',
  'camp',
  'echo',
  'hunting stand',
  'lodge',
  'photo',
  'shooting range',
  'view',
];

// List of marker types that represent need zones
export const needZoneMarkerTypes: Array<NeedZoneMarkerType> = [
  'zone:drink',
  'zone:eat',
  'zone:gather',
  'zone:path',
  'zone:sleep',
];

// Map of marker types and their maximum map scale visibility
export const markerVisibilityMap = new Map<MarkerType, number>([
  ['animal:american badger', 0.55],
  ['animal:american black bear', 0.55],
  ['animal:bighorn sheep', 0.55],
  ['animal:elk', 0.55],
  ['animal:gray wolf', 0.55],
  ['animal:lesser scaup', 0.55],
  ['animal:moose', 0.55],
  ['animal:mountain goat', 0.55],
  ['animal:mule deer', 0.55],
  ['animal:pheasant', 0.55],
  ['animal:red fox', 0.55],
  ['animal:ross goose', 0.55],
  ['animal:showshoe hare', 0.55],
  ['animal:white-tailed deer', 0.55],
  ['animal:wild duck', 0.55],
  ['cabin', 0.25],
  ['camp', 0.25],
  ['echo', 0.35],
  ['hunting stand', 0.45],
  ['lodge', 0],
  ['photo', 0.35],
  ['shooting range', 0.25],
  ['view', 0.35],
  ['zone:drink', 0.65],
  ['zone:eat', 0.65],
  ['zone:sleep', 0.65],
]);
