import {
  CSSProperties,
  FunctionComponent,
  MouseEvent,
  ReactNode,
  SVGProps,
  TouchEvent,
} from 'react';

type IconClickHandler = (event: MouseEvent<EventTarget>) => void;
type IconLongPressHandler = (event: TouchEvent<EventTarget>) => void;

export interface IconProps {
  className?: string;
  highlighted?: boolean;
  longPressMs?: number;
  size?: number;
  style?: CSSProperties;
  title?: string;
  onClick?: IconClickHandler;
  onLongPress?: IconLongPressHandler;
}

export interface IconComponentProps extends IconProps {
  children: ReactNode;
}

export interface ImageIconProps extends IconProps {
  src: string;
}

export interface VectorIconProps extends IconProps {
  component: FunctionComponent<SVGProps<SVGElement>>;
}
