export interface Animal {
  description: string;
  hitEnergy: [number, number];
  id: string;
  latin: string;
  lifeCycle: Array<AnimalActivityValue>;
  name: string;
  tier: number;
}

export enum AnimalActivity {
  Drinking = 'drinking',
  Feeding = 'feeding',
  Sleeping = 'sleeping',
}

export interface AnimalActivityValue {
  activity: AnimalActivity;
  time: number;
}

export interface AnimalGroup {
  animals: Array<Animal>;
  tier: number;
}
