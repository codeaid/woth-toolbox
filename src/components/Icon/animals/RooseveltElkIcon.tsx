import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import RooseveltElkSvg from './assets/RooseveltElk.svg';

export const RooseveltElkIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={RooseveltElkSvg} {...props} ref={ref} />
  ),
);

RooseveltElkIcon.displayName = 'RooseveltElkIcon';
