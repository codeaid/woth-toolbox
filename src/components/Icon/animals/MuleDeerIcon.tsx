import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import MuleDeerSvg from './assets/MuleDeer.svg';

export const MuleDeerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={MuleDeerSvg} {...props} ref={ref} />
  ),
);

MuleDeerIcon.displayName = 'MuleDeerIcon';
