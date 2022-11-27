import {
  AnimalMarkerType,
  GenericMarkerType,
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
