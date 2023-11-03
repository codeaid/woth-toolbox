import type { Animal } from 'types/animals';
import birds from './birds';
import tier1 from './tier1';
import tier3 from './tier3';
import tier4 from './tier4';
import tier5 from './tier5';
import tier6 from './tier6';

export const fauna: Array<Animal> = birds.concat(
  tier1,
  tier3,
  tier4,
  tier5,
  tier6,
);
