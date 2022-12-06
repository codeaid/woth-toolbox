import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import AmericanBadgerSvg from './assets/AmericanBadger.svg';

export const AmericanBadgerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={AmericanBadgerSvg} {...props} ref={ref} />
  ),
);

AmericanBadgerIcon.displayName = 'AmericanBadgerIcon';
