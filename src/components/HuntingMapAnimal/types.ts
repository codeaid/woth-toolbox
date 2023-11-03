import type { CSSProperties } from 'react';
import type { MarkerOptionsAnimal } from 'types/markers';

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
  markerTrophyRating?: boolean;
  style?: CSSProperties;
  onToggleEditor: HuntingMapAnimalToggleEditorHandler;
  onToggleZones: HuntingMapAnimalMarkerToggleZonesHandler;
}
