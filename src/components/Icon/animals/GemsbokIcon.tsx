import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import GemsbokSvg from './assets/Gemsbok.svg';

export const GemsbokIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={GemsbokSvg} {...props} ref={ref} />
  ),
);

GemsbokIcon.displayName = 'GemsbokIcon';
