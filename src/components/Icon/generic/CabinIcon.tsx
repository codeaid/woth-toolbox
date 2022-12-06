import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import CabinSvg from './assets/Cabin.svg';

export const CabinIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={CabinSvg} {...props} ref={ref} />
  ),
);

CabinIcon.displayName = 'CabinIcon';
