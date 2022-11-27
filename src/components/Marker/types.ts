import { CSSProperties, MouseEvent } from 'react';
import { MarkerType } from 'types/markers';

type MarkerClickHandler = (event: MouseEvent<EventTarget>) => void;

export interface MarkerProps {
  alt?: string;
  className?: string;
  highlighted?: boolean;
  size?: number;
  style?: CSSProperties;
  title?: string;
  type: MarkerType;
  onClick?: MarkerClickHandler;
}
