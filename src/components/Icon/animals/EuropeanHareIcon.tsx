import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import EuropeanHareSvg from './assets/EuropeanHare.svg';

export const EuropeanHareIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={EuropeanHareSvg} {...props} ref={ref} />
  ),
);

EuropeanHareIcon.displayName = 'EuropeanHareIcon';
