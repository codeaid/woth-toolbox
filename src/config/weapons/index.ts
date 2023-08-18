import { Weapon } from 'types/weapons';
import tier1 from './tier1';
import tier3 from './tier3';
import tier4 from './tier4';
import tier5 from './tier5';
import tier6 from './tier6';

export const weapons: Array<Weapon> = tier1.concat(tier3, tier4, tier5, tier6);
