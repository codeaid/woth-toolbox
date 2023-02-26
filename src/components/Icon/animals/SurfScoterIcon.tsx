import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import SurfScoterSvg from './assets/SurfScoter.svg';

export const SurfScoterIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={SurfScoterSvg} {...props} ref={ref} />
  ),
);

SurfScoterIcon.displayName = 'SurfScoterIcon';
