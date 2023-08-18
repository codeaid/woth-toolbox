import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import BlackWildebeestSvg from './assets/BlackWildebeest.svg';

export const BlackWildebeestIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={BlackWildebeestSvg} {...props} ref={ref} />
  ),
);

BlackWildebeestIcon.displayName = 'BlackWildebeestIcon';
