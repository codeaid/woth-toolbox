import { AnimalType } from 'types/animals';

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

export type MarkerType = AnimalType | GenericMarkerType | ZoneMarkerType;

export type MarkerPosition = [number, number];

export interface MarkerOptions<TMarkerType = MarkerType> {
  coords: MarkerPosition;
  type: TMarkerType;
}

export interface AnimalMarkerOptions extends MarkerOptions<AnimalType> {
  drink: Array<MarkerOptions<'zone:drink'>>;
  eat: Array<MarkerOptions<'zone:eat'>>;
  sleep: Array<MarkerOptions<'zone:sleep'>>;
}
