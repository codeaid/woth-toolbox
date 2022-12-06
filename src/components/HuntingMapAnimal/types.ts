import { CSSProperties } from 'react';
import { MapMarkerRef } from 'types/cartography';
import { AnimalMarkerData, AnimalMarkerOptions } from 'types/markers';

type HuntingMapAnimalToggleEditorHandler = (
  marker: AnimalMarkerOptions,
  visible: boolean,
) => void;
type HuntingMapAnimalMarkerToggleZonesHandler = (
  marker: AnimalMarkerOptions,
) => void;

export interface HuntingMapAnimalProps {
  activated?: boolean;
  className?: string;
  marker: AnimalMarkerOptions;
  size?: number;
  style?: CSSProperties;
  zoneSize?: number;
  onToggleEditor: HuntingMapAnimalToggleEditorHandler;
  onToggleZones: HuntingMapAnimalMarkerToggleZonesHandler;
}

export interface HuntingMapAnimalRef extends MapMarkerRef {
  setData: (data?: AnimalMarkerData) => void;
  setEditorActive: (visible: boolean) => void;
  setZonesVisible: (visible: boolean) => void;
}
