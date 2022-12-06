import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import EchoSvg from './assets/Echo.svg';

export const EchoIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={EchoSvg} {...props} ref={ref} />
  ),
);

EchoIcon.displayName = 'EchoIcon';
