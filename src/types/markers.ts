import {
  AnimalIconType,
  GenericIconType,
  IconType,
  NeedZoneIconType,
} from 'types/icons';

export type MarkerPosition = [number, number];

// Alias types for more logical naming conventions
export type MarkerType = IconType;
export type AnimalMarkerType = AnimalIconType;
export type GenericMarkerType = GenericIconType;
export type NeedZoneMarkerType = NeedZoneIconType;

export interface MarkerOptions<TMarkerType = MarkerType> {
  coords: MarkerPosition;
  id?: string;
  type: TMarkerType;
}

export interface AnimalMarkerOptions extends MarkerOptions<AnimalMarkerType> {
  drink: Array<MarkerOptions<'zone:drink'>>;
  eat: Array<MarkerOptions<'zone:eat'>>;
  sleep: Array<MarkerOptions<'zone:sleep'>>;
}
