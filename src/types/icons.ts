import { AnimalType } from 'types/animals';

export type IconTypeAnimal = AnimalType;

export type IconTypeGeneric =
  | 'cabin'
  | 'cabin:undiscovered'
  | 'camp'
  | 'echo'
  | 'hunting stand'
  | 'lodge'
  | 'photo'
  | 'shooting range'
  | 'view';

export type IconTypeNeedZone =
  | 'zone:drink'
  | 'zone:eat'
  | 'zone:gather'
  | 'zone:path'
  | 'zone:sleep';

export type IconTypeUI =
  | 'age'
  | 'rating'
  | 'trophy'
  | 'sex:female'
  | 'sex:generic'
  | 'sex:male'
  | 'species';

export type IconType =
  | IconTypeAnimal
  | IconTypeGeneric
  | IconTypeNeedZone
  | IconTypeUI;
