import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import RedFoxSvg from './assets/RedFox.svg';

export const RedFoxIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={RedFoxSvg} {...props} ref={ref} />
  ),
);

RedFoxIcon.displayName = 'RedFoxIcon';
