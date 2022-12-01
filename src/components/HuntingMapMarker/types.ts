import { CSSProperties, MouseEvent } from 'react';
import { MarkerOptions, MarkerType } from 'types/markers';

type HuntingMapMarkerClickHandler = (
  marker: MarkerOptions,
  event: MouseEvent<EventTarget>,
) => void;
type HuntingMapMarkerLongPressHandler = () => void;

export interface HuntingMapMarkerProps {
  className?: string;
  highlighted?: boolean;
  mapScale: number;
  marker: MarkerOptions;
  markerRangeMap: Map<MarkerType, number>;
  maxMarkerSize: number;
  style?: CSSProperties;
  visible?: boolean;
  onClick?: HuntingMapMarkerClickHandler;
  onLongPress?: HuntingMapMarkerLongPressHandler;
}
