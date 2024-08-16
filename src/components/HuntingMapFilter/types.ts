import type { MapFilterOptions } from 'types/cartography';
import type { AnimalMarker, GenericMarker, MarkerType } from 'types/markers';

export type HuntingMapFilterChangeHandler = (options: MapFilterOptions) => void;
type HuntingMapFilterOptionChangeHandler = (checked: boolean) => void;
type HuntingMapFilterValueChangeHandler = (
  selected: boolean,
  type: MarkerType,
) => void;

export interface HuntingMapFilterProps {
  animalMarkers: Array<AnimalMarker>;
  genericMarkers: Array<GenericMarker>;
  options: MapFilterOptions;
  onChange: HuntingMapFilterChangeHandler;
}

export interface HuntingMapFilterItemProps {
  children: string;
  iconSize: number;
  selected: boolean;
  type: MarkerType;
  onChange: HuntingMapFilterValueChangeHandler;
}

export interface HuntingMapFilterOptionProps {
  checked: boolean;
  children: string;
  onChange: HuntingMapFilterOptionChangeHandler;
}
