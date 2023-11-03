import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import MuleDeerSvg from './assets/MuleDeer.svg';

export const MuleDeerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={MuleDeerSvg} {...props} ref={ref} />
  ),
);

MuleDeerIcon.displayName = 'MuleDeerIcon';
