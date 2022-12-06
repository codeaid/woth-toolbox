import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import EuropeanHareSvg from './assets/EuropeanHare.svg';

export const EuropeanHareIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={EuropeanHareSvg} {...props} ref={ref} />
  ),
);

EuropeanHareIcon.displayName = 'EuropeanHareIcon';
