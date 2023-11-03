import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import LionSvg from './assets/Lion.svg';

export const LionIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={LionSvg} {...props} ref={ref} />
  ),
);

LionIcon.displayName = 'LionIcon';
