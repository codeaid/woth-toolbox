import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import MooseSvg from './assets/Moose.svg';

export const MooseIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={MooseSvg} {...props} ref={ref} />
  ),
);

MooseIcon.displayName = 'MooseIcon';
