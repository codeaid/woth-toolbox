import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import WildDuckSvg from './assets/WildDuck.svg';

export const WildDuckIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={WildDuckSvg} {...props} ref={ref} />
  ),
);

WildDuckIcon.displayName = 'WildDuckIcon';
