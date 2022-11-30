import { CSSProperties, MouseEvent } from 'react';
import { IconType } from 'types/icons';

type IconClickHandler = (event: MouseEvent<EventTarget>) => void;
type IconLongPressHandler = () => void;

export interface IconProps {
  alt?: string;
  className?: string;
  highlighted?: boolean;
  size?: number;
  style?: CSSProperties;
  title?: string;
  type: IconType;
  onClick?: IconClickHandler;
  onLongPress?: IconLongPressHandler;
}
