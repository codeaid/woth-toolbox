import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import RedDeerSvg from './assets/RedDeer.svg';

export const RedDeerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={RedDeerSvg} {...props} ref={ref} />
  ),
);

RedDeerIcon.displayName = 'RedDeerIcon';
