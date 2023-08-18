import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import LionSvg from './assets/Lion.svg';

export const LionIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={LionSvg} {...props} ref={ref} />
  ),
);

LionIcon.displayName = 'LionIcon';
