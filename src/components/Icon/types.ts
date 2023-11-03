import type {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  SVGProps,
  TouchEvent,
} from 'react';

type IconClickHandler = (event: MouseEvent<EventTarget>) => void;
type IconLongPressHandler = (event: TouchEvent<EventTarget>) => void;

export interface IconProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  highlighted?: boolean;
  longPressMs?: number;
  size?: number;
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
