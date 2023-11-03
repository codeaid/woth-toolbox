import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import RooseveltElkSvg from './assets/RooseveltElk.svg';

export const RooseveltElkIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={RooseveltElkSvg} {...props} ref={ref} />
  ),
);

RooseveltElkIcon.displayName = 'RooseveltElkIcon';
