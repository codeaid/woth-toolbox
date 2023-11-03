import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import EurasianBadgerSvg from './assets/EurasianBadger.svg';

export const EurasianBadgerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={EurasianBadgerSvg} {...props} ref={ref} />
  ),
);

EurasianBadgerIcon.displayName = 'EurasianBadgerIcon';
