import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import AlaskaMooseSvg from './assets/AlaskaMoose.svg';

export const AlaskaMooseIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={AlaskaMooseSvg} {...props} ref={ref} />
  ),
);

AlaskaMooseIcon.displayName = 'AlaskaMooseIcon';
