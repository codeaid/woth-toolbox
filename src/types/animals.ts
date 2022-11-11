export interface Animal {
  description: string;
  hitEnergy: [number, number];
  id: string;
  latin: string;
  name: string;
  tier: number;
}

export interface AnimalGroup {
  animals: Array<Animal>;
  tier: number;
}
