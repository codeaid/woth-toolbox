import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import RedDeerSvg from './assets/RedDeer.svg';

export const RedDeerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={RedDeerSvg} {...props} ref={ref} />
  ),
);

RedDeerIcon.displayName = 'RedDeerIcon';
