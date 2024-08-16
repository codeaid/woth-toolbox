import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import EurasianWolverineSvg from './assets/EurasianWolverine.svg';

export const EurasianWolverineIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={EurasianWolverineSvg} {...props} ref={ref} />
  ),
);

EurasianWolverineIcon.displayName = 'EurasianWolverineIcon';
