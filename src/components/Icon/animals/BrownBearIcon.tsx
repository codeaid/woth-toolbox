import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import BrownBearSvg from './assets/BrownBear.svg';

export const BrownBearIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={BrownBearSvg} {...props} ref={ref} />
  ),
);

BrownBearIcon.displayName = 'BrownBearIcon';
