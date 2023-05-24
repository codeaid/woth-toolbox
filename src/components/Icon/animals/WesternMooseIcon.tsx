import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import WesternMooseSvg from './assets/WesternMoose.svg';

export const WesternMooseIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={WesternMooseSvg} {...props} ref={ref} />
  ),
);

WesternMooseIcon.displayName = 'MooseIcon';
