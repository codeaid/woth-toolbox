import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import HuntingStandSvg from './assets/HuntingStand.svg';

export const HuntingStandIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={HuntingStandSvg} {...props} ref={ref} />
  ),
);

HuntingStandIcon.displayName = 'HuntingStandIcon';
