export type AnimalMarkerType =
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

export type GenericMarkerType =
  | 'cabin'
  | 'cabin:undiscovered'
  | 'camp'
  | 'echo'
  | 'hunting stand'
  | 'lodge'
  | 'photo'
  | 'shooting range'
  | 'view';

export type ZoneMarkerType =
  | 'zone:drink'
  | 'zone:eat'
  | 'zone:gather'
  | 'zone:path'
  | 'zone:sleep';

export type MarkerType = AnimalMarkerType | GenericMarkerType | ZoneMarkerType;

export type MarkerPosition = [number, number];

export interface MarkerOptions<TMarkerType = MarkerType> {
  coords: MarkerPosition;
  type: TMarkerType;
}

export interface AnimalMarkerOptions extends MarkerOptions<AnimalMarkerType> {
  drink: Array<MarkerOptions<'zone:drink'>>;
  eat: Array<MarkerOptions<'zone:eat'>>;
  sleep: Array<MarkerOptions<'zone:sleep'>>;
}
