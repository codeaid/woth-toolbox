import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import BrownBearSvg from './assets/BrownBear.svg';

export const BrownBearIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={BrownBearSvg} {...props} ref={ref} />
  ),
);

BrownBearIcon.displayName = 'BrownBearIcon';
