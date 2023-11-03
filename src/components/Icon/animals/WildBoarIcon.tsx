import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import WildBoarSvg from './assets/WildBoar.svg';

export const WildBoarIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={WildBoarSvg} {...props} ref={ref} />
  ),
);

WildBoarIcon.displayName = 'WildBoarIcon';
