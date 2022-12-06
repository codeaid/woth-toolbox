import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import ShootingRangeSvg from './assets/ShootingRange.svg';

export const ShootingRangeIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={ShootingRangeSvg} {...props} ref={ref} />
  ),
);

ShootingRangeIcon.displayName = 'ShootingRangeIcon';
