import { CSSProperties, MouseEvent } from 'react';
import { MarkerOptions } from 'types/markers';

type HuntingMapMarkerClickHandler<TMarkerOptions extends MarkerOptions> = (
  marker: TMarkerOptions,
  event: MouseEvent<EventTarget>,
) => void;
type HuntingMapMarkerLongPressHandler = () => void;

export interface HuntingMapMarkerProps<TMarkerOptions extends MarkerOptions> {
  className?: string;
  forceVisible?: boolean;
  highlighted?: boolean;
  marker: TMarkerOptions;
  markerSize?: number;
  mountOnEnter?: boolean;
  style?: CSSProperties;
  title?: string;
  unmountOnExit?: boolean;
  onClick?: HuntingMapMarkerClickHandler<TMarkerOptions>;
  onLongPress?: HuntingMapMarkerLongPressHandler;
}
