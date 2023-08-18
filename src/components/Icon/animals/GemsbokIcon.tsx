import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import GemsbokSvg from './assets/Gemsbok.svg';

export const GemsbokIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={GemsbokSvg} {...props} ref={ref} />
  ),
);

GemsbokIcon.displayName = 'GemsbokIcon';
