import { Animal, AnimalActivityValue, AnimalGroup } from 'types/animals';

export interface AnimalActivityGridProps {
  animals: Array<Animal>;
}

export interface AnimalActivityGridGroupProps {
  group: AnimalGroup;
}

export interface AnimalActivityGridIconProps {
  intermediate?: boolean;
  value: AnimalActivityValue;
}

export interface AnimalActivityGridRowProps {
  animal: Animal;
}

export interface AnimalActivityGridRowsProps {
  animals: Array<Animal>;
}
