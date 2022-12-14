import { Animal, AnimalActivityData } from 'types/animals';
import { EntityGroup } from 'types/global';

export interface AnimalActivityGridProps {
  animals: Array<Animal>;
}

export interface AnimalActivityGridGroupProps {
  group: EntityGroup<Animal>;
}

export interface AnimalActivityGridIconProps {
  intermediate?: boolean;
  title?: string;
  value: AnimalActivityData;
}

export interface AnimalActivityGridRowProps {
  animal: Animal;
}

export interface AnimalActivityGridRowsProps {
  animals: Array<Animal>;
}
