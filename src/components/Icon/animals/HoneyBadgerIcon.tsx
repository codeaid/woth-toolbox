import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import HoneyBadgerSvg from './assets/HoneyBadger.svg';

export const HoneyBadgerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={HoneyBadgerSvg} {...props} ref={ref} />
  ),
);

HoneyBadgerIcon.displayName = 'HoneyBadgerIcon';
