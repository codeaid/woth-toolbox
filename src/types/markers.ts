export type AnimalMarker =
  | 'animal:american badger'
  | 'animal:american black bear'
  | 'animal:bighorn sheep'
  | 'animal:brown bear'
  | 'animal:chamois'
  | 'animal:elk'
  | 'animal:eurasian badger'
  | 'animal:european hare'
  | 'animal:fallow deer'
  | 'animal:golden jackal'
  | 'animal:gray wolf'
  | 'animal:greylag goose'
  | 'animal:lesser scaup'
  | 'animal:moose'
  | 'animal:mouflon'
  | 'animal:mountain goat'
  | 'animal:mule deer'
  | 'animal:pheasant'
  | 'animal:red deer'
  | 'animal:red fox'
  | 'animal:roe deer'
  | 'animal:ross goose'
  | 'animal:showshoe hare'
  | 'animal:white-tailed deer'
  | 'animal:wild boar'
  | 'animal:wild duck';

export type GenericMarker =
  | 'cabin'
  | 'cabin:undiscovered'
  | 'camp'
  | 'hunting stand'
  | 'lodge'
  | 'photo'
  | 'shooting range'
  | 'view';

export type ZoneMarker =
  | 'zone:drink'
  | 'zone:eat'
  | 'zone:gather'
  | 'zone:path'
  | 'zone:sleep';

export type MarkerType = AnimalMarker | GenericMarker | ZoneMarker;

type MarkerPosition = [number, number];

export interface MarkerOptions {
  pos: MarkerPosition;
  type: MarkerType;
}
