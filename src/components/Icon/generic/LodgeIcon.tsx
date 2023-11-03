import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import LodgeSvg from './assets/Lodge.svg';

export const LodgeIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={LodgeSvg} {...props} ref={ref} />
  ),
);

LodgeIcon.displayName = 'LodgeIcon';
