import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import AmericanBadgerSvg from './assets/AmericanBadger.svg';

export const AmericanBadgerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={AmericanBadgerSvg} {...props} ref={ref} />
  ),
);

AmericanBadgerIcon.displayName = 'AmericanBadgerIcon';
