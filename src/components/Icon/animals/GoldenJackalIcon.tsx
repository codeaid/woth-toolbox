import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import GoldenJackalSvg from './assets/GoldenJackal.svg';

export const GoldenJackalIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={GoldenJackalSvg} {...props} ref={ref} />
  ),
);

GoldenJackalIcon.displayName = 'GoldenJackalIcon';
