import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import ParkingSvg from './assets/Parking.svg';

export const ParkingIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={ParkingSvg} {...props} ref={ref} />
  ),
);

ParkingIcon.displayName = 'ParkingIcon';
