import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import HoneyBadgerSvg from './assets/HoneyBadger.svg';

export const HoneyBadgerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={HoneyBadgerSvg} {...props} ref={ref} />
  ),
);

HoneyBadgerIcon.displayName = 'HoneyBadgerIcon';
