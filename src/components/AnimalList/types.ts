import type { Animal } from 'types/animals';
import type { EntityGroup } from 'types/generic';

type AnimalListItemClickHandler = (animal: Animal) => void;

export interface AnimalListGroupProps {
  group: EntityGroup<Animal>;
  selected?: Animal;
  onAnimalClick: AnimalListItemClickHandler;
}

export interface AnimalListItemProps {
  active?: boolean;
  animal: Animal;
  onClick: AnimalListItemClickHandler;
}

export interface AnimalListProps {
  animals: Array<Animal>;
  selected?: Animal;
  onAnimalClick: AnimalListItemClickHandler;
}
