import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import AmericanBlackBearSvg from './assets/AmericanBlackBear.svg';

export const AmericanBlackBearIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={AmericanBlackBearSvg} {...props} ref={ref} />
  ),
);

AmericanBlackBearIcon.displayName = 'AmericanBlackBearIcon';
