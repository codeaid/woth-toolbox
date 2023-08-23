import { Animal, AnimalActivityData } from 'types/animals';
import { MapType } from 'types/cartography';
import { EntityGroup } from 'types/generic';

type AnimalActivityGridButtonChangeHandler = (mapType?: MapType) => void;

export interface AnimalActivityGridFilterProps {
  mapType?: MapType;
  onChange: AnimalActivityGridButtonChangeHandler;
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

export interface AnimalActivityGridProps {
  animals: Array<Animal>;
}
