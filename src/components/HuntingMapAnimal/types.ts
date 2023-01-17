import { CSSProperties } from 'react';
import { MarkerOptionsAnimal } from 'types/markers';

type HuntingMapAnimalToggleEditorHandler = (
  marker: MarkerOptionsAnimal,
  visible: boolean,
  source: string,
) => void;
type HuntingMapAnimalMarkerToggleZonesHandler = (
  marker: MarkerOptionsAnimal,
) => void;

export interface HuntingMapAnimalProps {
  className?: string;
  marker: MarkerOptionsAnimal;
  markerSize?: number;
  markerSizeZone?: number;
  style?: CSSProperties;
  onToggleEditor: HuntingMapAnimalToggleEditorHandler;
  onToggleZones: HuntingMapAnimalMarkerToggleZonesHandler;
}
