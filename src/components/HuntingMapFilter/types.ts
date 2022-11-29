import { AnimalMarkerOptions, MarkerOptions, MarkerType } from 'types/markers';

export type HuntingMapFilterChangeHandler = (
  selectedTypes: Array<MarkerType>,
) => void;
type HuntingMapFilterValueChangeHandler = (
  type: MarkerType,
  selected: boolean,
) => void;

export interface HuntingMapFilterProps {
  animalMarkers: Array<AnimalMarkerOptions>;
  genericMarkers: Array<MarkerOptions>;
  selectedTypes: Array<MarkerType>;
  onChange?: HuntingMapFilterChangeHandler;
}

export interface HuntingMapFilterItemProps {
  children: string;
  large?: boolean;
  selected: boolean;
  type: MarkerType;
  onToggle: HuntingMapFilterValueChangeHandler;
}
