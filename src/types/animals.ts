export interface Animal {
  description: string;
  hitEnergy: [number, number];
  latin: string;
  lifeCycle: Array<AnimalActivityValue>;
  name: string;
  slug: string;
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
