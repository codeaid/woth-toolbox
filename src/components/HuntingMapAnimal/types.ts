import type { CSSProperties } from 'react';
import type { AnimalMarker } from 'types/markers';

type HuntingMapAnimalToggleEditorHandler = (
  marker: AnimalMarker,
  visible: boolean,
  source: string,
) => void;
type HuntingMapAnimalMarkerToggleZonesHandler = (marker: AnimalMarker) => void;

export interface HuntingMapAnimalProps {
  className?: string;
  marker: AnimalMarker;
  markerSize?: number;
  markerSizeZone?: number;
  markerTrophyRating?: boolean;
  style?: CSSProperties;
  onToggleEditor: HuntingMapAnimalToggleEditorHandler;
  onToggleZones: HuntingMapAnimalMarkerToggleZonesHandler;
}
