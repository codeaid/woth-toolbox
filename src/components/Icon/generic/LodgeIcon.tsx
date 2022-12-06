import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import LodgeSvg from './assets/Lodge.svg';

export const LodgeIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={LodgeSvg} {...props} ref={ref} />
  ),
);

LodgeIcon.displayName = 'LodgeIcon';
