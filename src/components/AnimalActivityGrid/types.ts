import type { Animal, AnimalActivityData } from 'types/animals';
import type { MapId } from 'types/cartography';
import type { EntityGroup } from 'types/generic';

type AnimalActivityGridButtonChangeHandler = (mapType?: MapId) => void;

export interface AnimalActivityGridFilterProps {
  mapType?: MapId;
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
