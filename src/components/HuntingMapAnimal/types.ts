import { CSSProperties } from 'react';
import { AnimalMarkerOptions, MarkerType } from 'types/markers';

type HuntingMapAnimalActivateHandler = (marker?: AnimalMarkerOptions) => void;
type HuntingMapAnimalToggleHandler = (
  marker: AnimalMarkerOptions,
  expanded: boolean,
) => void;

export interface HuntingMapAnimalProps {
  activated?: boolean;
  expanded?: boolean;
  mapScale: number;
  marker: AnimalMarkerOptions;
  markerRangeMap: Map<MarkerType, number>;
  maxMarkerSize: number;
  style?: CSSProperties;
  visible?: boolean;
  onActivate: HuntingMapAnimalActivateHandler;
  onToggle: HuntingMapAnimalToggleHandler;
}
