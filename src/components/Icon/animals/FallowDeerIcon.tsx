import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import FallowDeerSvg from './assets/FallowDeer.svg';

export const FallowDeerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={FallowDeerSvg} {...props} ref={ref} />
  ),
);

FallowDeerIcon.displayName = 'FallowDeerIcon';
