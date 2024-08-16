import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import EurasianMooseSvg from './assets/EurasianMoose.svg';

export const EurasianMooseIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={EurasianMooseSvg} {...props} ref={ref} />
  ),
);

EurasianMooseIcon.displayName = 'EurasianMooseIcon';
