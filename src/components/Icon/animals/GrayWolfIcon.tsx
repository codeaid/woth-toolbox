import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import GrayWolfSvg from './assets/GrayWolf.svg';

export const GrayWolfIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={GrayWolfSvg} {...props} ref={ref} />
  ),
);

GrayWolfIcon.displayName = 'GrayWolfIcon';
