export interface Animal {
  description: string;
  hitEnergy: [number, number];
  latin: string;
  lifeCycle: Array<AnimalActivityValue>;
  name: string;
  slug: string;
  tier: number;
  type: AnimalType;
}

export enum AnimalActivity {
  Drinking = 'drinking',
  Feeding = 'feeding',
  Gathering = 'gathering',
  Sleeping = 'sleeping',
}

export interface AnimalActivityValue {
  activity: AnimalActivity;
  time: number;
}

export type AnimalAge = 'young' | 'adult' | 'mature';

export type AnimalRating = 'F' | 'M1' | 'M2' | 'M3' | 'M4' | 'M5';

export interface AnimalSpecimen {
  age: AnimalAge;
  rating: AnimalRating;
}

export type AnimalType =
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
