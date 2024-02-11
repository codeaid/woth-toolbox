import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import EuropeanRabbitSvg from './assets/EuropeanRabbit.svg';

export const EuropeanRabbitIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={EuropeanRabbitSvg} {...props} ref={ref} />
  ),
);

EuropeanRabbitIcon.displayName = 'EuropeanRabbitIcon';
