import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import WesternMooseSvg from './assets/WesternMoose.svg';

export const WesternMooseIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={WesternMooseSvg} {...props} ref={ref} />
  ),
);

WesternMooseIcon.displayName = 'MooseIcon';
