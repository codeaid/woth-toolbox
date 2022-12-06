import { CSSProperties, MouseEvent } from 'react';
import { MarkerOptions } from 'types/markers';

type HuntingMapMarkerClickHandler = (
  marker: MarkerOptions,
  event: MouseEvent<EventTarget>,
) => void;
type HuntingMapMarkerLongPressHandler = () => void;

export interface HuntingMapMarkerProps {
  className?: string;
  forceVisible?: boolean;
  highlighted?: boolean;
  marker: MarkerOptions;
  mountOnEnter?: boolean;
  size?: number;
  style?: CSSProperties;
  unmountOnExit?: boolean;
  onClick?: HuntingMapMarkerClickHandler;
  onLongPress?: HuntingMapMarkerLongPressHandler;
}
