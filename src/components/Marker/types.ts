import { CSSProperties } from 'react';
import { MarkerType } from 'types/markers';

export interface MarkerProps {
  alt?: string;
  className?: string;
  size?: number;
  style?: CSSProperties;
  title?: string;
  type: MarkerType;
}
