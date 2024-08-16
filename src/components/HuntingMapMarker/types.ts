import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import type { Marker } from 'types/markers';

type HuntingMapMarkerClickHandler<TMarkerOptions extends Marker> = (
  marker: TMarkerOptions,
  event: MouseEvent<EventTarget>,
) => void;
type HuntingMapMarkerKeyboardEventHandler<TMarker extends Marker> = (
  marker: TMarker,
  event: KeyboardEvent,
) => void;
type HuntingMapMarkerLongPressHandler<TMarker extends Marker> = (
  marker: TMarker,
) => void;

export interface HuntingMapMarkerProps<TMarker extends Marker> {
  children?: ReactNode;
  className?: string;
  forceVisible?: boolean;
  highlighted?: boolean;
  marker: TMarker;
  markerSize?: number;
  mountOnEnter?: boolean;
  style?: CSSProperties;
  title?: string;
  unmountOnExit?: boolean;
  onClick?: HuntingMapMarkerClickHandler<TMarker>;
  onKeyDown?: HuntingMapMarkerKeyboardEventHandler<TMarker>;
  onLongPress?: HuntingMapMarkerLongPressHandler<TMarker>;
}
