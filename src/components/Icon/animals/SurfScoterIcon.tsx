import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import SurfScoterSvg from './assets/SurfScoter.svg';

export const SurfScoterIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={SurfScoterSvg} {...props} ref={ref} />
  ),
);

SurfScoterIcon.displayName = 'SurfScoterIcon';
