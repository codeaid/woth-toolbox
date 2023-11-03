import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import GoldenJackalSvg from './assets/GoldenJackal.svg';

export const GoldenJackalIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={GoldenJackalSvg} {...props} ref={ref} />
  ),
);

GoldenJackalIcon.displayName = 'GoldenJackalIcon';
