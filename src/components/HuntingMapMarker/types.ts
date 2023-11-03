import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import type { MarkerOptions } from 'types/markers';

type HuntingMapMarkerClickHandler<TMarkerOptions extends MarkerOptions> = (
  marker: TMarkerOptions,
  event: MouseEvent<EventTarget>,
) => void;
type HuntingMapMarkerKeyboardEventHandler<
  TMarkerOptions extends MarkerOptions,
> = (marker: TMarkerOptions, event: KeyboardEvent) => void;
type HuntingMapMarkerLongPressHandler<TMarkerOptions extends MarkerOptions> = (
  marker: TMarkerOptions,
) => void;

export interface HuntingMapMarkerProps<TMarkerOptions extends MarkerOptions> {
  children?: ReactNode;
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
  onKeyDown?: HuntingMapMarkerKeyboardEventHandler<TMarkerOptions>;
  onLongPress?: HuntingMapMarkerLongPressHandler<TMarkerOptions>;
}
