import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import ParkingSvg from './assets/Parking.svg';

export const ParkingIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={ParkingSvg} {...props} ref={ref} />
  ),
);

ParkingIcon.displayName = 'ParkingIcon';
