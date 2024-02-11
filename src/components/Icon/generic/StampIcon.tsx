import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import StampSvg from './assets/Stamp.svg';

export const StampIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={StampSvg} {...props} ref={ref} />
  ),
);

StampIcon.displayName = 'StampIcon';
