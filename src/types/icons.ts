import type { AnimalType } from 'types/animals';

export type IconTypeAnimal = AnimalType;

export type IconTypeGeneric =
  | 'cabin'
  | 'cabin:undiscovered'
  | 'camp'
  | 'echo'
  | 'flower'
  | 'hunting stand'
  | 'lodge'
  | 'parking'
  | 'photo'
  | 'race'
  | 'shooting range'
  | 'stamp'
  | 'swing'
  | 'view';

export type IconTypeMarker =
  | 'marker:exploration'
  | 'marker:level area'
  | 'marker:tracking';

export type IconTypeNeedZone = 'zone:drink' | 'zone:eat' | 'zone:sleep';

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
  | IconTypeMarker
  | IconTypeNeedZone
  | IconTypeUI;
