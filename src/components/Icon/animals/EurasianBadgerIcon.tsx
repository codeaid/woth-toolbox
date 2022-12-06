import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import EurasianBadgerSvg from './assets/EurasianBadger.svg';

export const EurasianBadgerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={EurasianBadgerSvg} {...props} ref={ref} />
  ),
);

EurasianBadgerIcon.displayName = 'EurasianBadgerIcon';
