import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import FallowDeerSvg from './assets/FallowDeer.svg';

export const FallowDeerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={FallowDeerSvg} {...props} ref={ref} />
  ),
);

FallowDeerIcon.displayName = 'FallowDeerIcon';
