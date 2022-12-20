import { MapFilterOptions } from 'types/cartography';
import {
  MarkerOptionsAnimal,
  MarkerOptionsGeneric,
  MarkerType,
} from 'types/markers';

export type HuntingMapFilterChangeHandler = (options: MapFilterOptions) => void;
type HuntingMapFilterOptionChangeHandler = (checked: boolean) => void;
type HuntingMapFilterValueChangeHandler = (
  type: MarkerType,
  selected: boolean,
) => void;

export interface HuntingMapFilterProps {
  animalMarkers: Array<MarkerOptionsAnimal>;
  genericMarkers: Array<MarkerOptionsGeneric>;
  options: MapFilterOptions;
  onChange: HuntingMapFilterChangeHandler;
}

export interface HuntingMapFilterItemProps {
  children: string;
  large?: boolean;
  selected: boolean;
  type: MarkerType;
  onChange: HuntingMapFilterValueChangeHandler;
}

export interface HuntingMapFilterOptionProps {
  checked: boolean;
  children: string;
  onChange: HuntingMapFilterOptionChangeHandler;
}
