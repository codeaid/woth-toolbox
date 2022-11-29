import { MarkerOptions, MarkerType } from 'types/markers';
import { MouseEvent } from 'react';

type HuntingMapMarkerClickHandler = (
  marker: MarkerOptions,
  event: MouseEvent<EventTarget>,
) => void;

export interface HuntingMapMarkerProps {
  className?: string;
  highlighted?: boolean;
  mapScale: number;
  marker: MarkerOptions;
  markerRangeMap: Map<MarkerType, number>;
  maxMarkerSize: number;
  selectedFilterTypes: Array<MarkerType>;
  visible?: boolean;
  onClick?: HuntingMapMarkerClickHandler;
}
