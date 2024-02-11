import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import HimalayanTahrSvg from './assets/HimalayanTahr.svg';

export const HimalayanTahrIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={HimalayanTahrSvg} {...props} ref={ref} />
  ),
);

HimalayanTahrIcon.displayName = 'HimalayanTahrIcon';
