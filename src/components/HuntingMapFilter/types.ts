import { AnimalMarkerOptions, MarkerOptions, MarkerType } from 'types/markers';

export type HuntingMapFilterChangeHandler = (
  options: HuntingMapFilterOptions,
) => void;
type HuntingMapFilterValueChangeHandler = (
  type: MarkerType,
  selected: boolean,
) => void;

export interface HuntingMapFilterOptions {
  selectedTypes: Array<MarkerType>;
}

export interface HuntingMapFilterProps {
  animalMarkers: Array<AnimalMarkerOptions>;
  genericMarkers: Array<MarkerOptions>;
  options: HuntingMapFilterOptions;
  onChange?: HuntingMapFilterChangeHandler;
}

export interface HuntingMapFilterItemProps {
  children: string;
  large?: boolean;
  selected: boolean;
  type: MarkerType;
  onToggle: HuntingMapFilterValueChangeHandler;
}
