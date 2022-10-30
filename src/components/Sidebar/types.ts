import { Animal } from 'types/animals';

type SidebarClickHandler = (animal: Animal) => void;

export interface SidebarProps {
  animals: Array<Animal>;
  selected?: Animal;
  onAnimalClick: SidebarClickHandler;
}

export interface SidebarItemProps {
  active?: boolean;
  animal: Animal;
  onClick: SidebarClickHandler;
}

export interface SidebarHeaderProps {
  tier: number;
}
