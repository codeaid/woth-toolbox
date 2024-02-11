import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import SambarDeerSvg from './assets/SambarDeer.svg';

export const SambarDeerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={SambarDeerSvg} {...props} ref={ref} />
  ),
);

SambarDeerIcon.displayName = 'SambarDeerIcon';
