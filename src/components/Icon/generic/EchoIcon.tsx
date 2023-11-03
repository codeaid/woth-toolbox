import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import EchoSvg from './assets/Echo.svg';

export const EchoIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={EchoSvg} {...props} ref={ref} />
  ),
);

EchoIcon.displayName = 'EchoIcon';
