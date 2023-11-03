import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import BarrenGroundCaribouSvg from './assets/BarrenGroundCaribou.svg';

export const BarrenGroundCaribouIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={BarrenGroundCaribouSvg} {...props} ref={ref} />
  ),
);

BarrenGroundCaribouIcon.displayName = 'BarrenGroundCaribouIcon';
