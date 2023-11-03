import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import RedFoxSvg from './assets/RedFox.svg';

export const RedFoxIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={RedFoxSvg} {...props} ref={ref} />
  ),
);

RedFoxIcon.displayName = 'RedFoxIcon';
