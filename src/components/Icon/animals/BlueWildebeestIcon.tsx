import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import BlueWildebeestSvg from './assets/BlueWildebeest.svg';

export const BlueWildebeestIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={BlueWildebeestSvg} {...props} ref={ref} />
  ),
);

BlueWildebeestIcon.displayName = 'BlueWildebeestIcon';
