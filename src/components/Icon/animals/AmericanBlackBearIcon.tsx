import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import AmericanBlackBearSvg from './assets/AmericanBlackBear.svg';

export const AmericanBlackBearIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={AmericanBlackBearSvg} {...props} ref={ref} />
  ),
);

AmericanBlackBearIcon.displayName = 'AmericanBlackBearIcon';
