import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import BlueWildebeestSvg from './assets/BlueWildebeest.svg';

export const BlueWildebeestIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={BlueWildebeestSvg} {...props} ref={ref} />
  ),
);

BlueWildebeestIcon.displayName = 'BlueWildebeestIcon';
