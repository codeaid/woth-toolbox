import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import CabinSvg from './assets/Cabin.svg';

export const CabinIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={CabinSvg} {...props} ref={ref} />
  ),
);

CabinIcon.displayName = 'CabinIcon';
