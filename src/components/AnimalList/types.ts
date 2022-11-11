import { Animal, AnimalGroup } from 'types/animals';

type AnimalListItemClickHandler = (animal: Animal) => void;

export interface AnimalListGroupProps {
  group: AnimalGroup;
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
