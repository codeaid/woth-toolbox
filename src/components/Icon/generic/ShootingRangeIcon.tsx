import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import ShootingRangeSvg from './assets/ShootingRange.svg';

export const ShootingRangeIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={ShootingRangeSvg} {...props} ref={ref} />
  ),
);

ShootingRangeIcon.displayName = 'ShootingRangeIcon';
