import { AnimalType } from 'types/animals';

export type AnimalIconType = AnimalType;

export type GenericIconType =
  | 'cabin'
  | 'cabin:undiscovered'
  | 'camp'
  | 'echo'
  | 'hunting stand'
  | 'lodge'
  | 'photo'
  | 'shooting range'
  | 'view';

export type NeedZoneIconType =
  | 'zone:drink'
  | 'zone:eat'
  | 'zone:gather'
  | 'zone:path'
  | 'zone:sleep';

export type IconType = AnimalIconType | GenericIconType | NeedZoneIconType;
