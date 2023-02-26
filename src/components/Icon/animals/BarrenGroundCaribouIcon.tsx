import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import BarrenGroundCaribouSvg from './assets/BarrenGroundCaribou.svg';

export const BarrenGroundCaribouIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={BarrenGroundCaribouSvg} {...props} ref={ref} />
  ),
);

BarrenGroundCaribouIcon.displayName = 'BarrenGroundCaribouIcon';
