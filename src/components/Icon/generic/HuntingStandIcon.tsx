import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import HuntingStandSvg from './assets/HuntingStand.svg';

export const HuntingStandIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={HuntingStandSvg} {...props} ref={ref} />
  ),
);

HuntingStandIcon.displayName = 'HuntingStandIcon';
