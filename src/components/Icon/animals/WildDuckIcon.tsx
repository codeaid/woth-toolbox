import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import WildDuckSvg from './assets/WildDuck.svg';

export const WildDuckIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={WildDuckSvg} {...props} ref={ref} />
  ),
);

WildDuckIcon.displayName = 'WildDuckIcon';
