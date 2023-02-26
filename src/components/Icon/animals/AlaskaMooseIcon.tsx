import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import AlaskaMooseSvg from './assets/AlaskaMoose.svg';

export const AlaskaMooseIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={AlaskaMooseSvg} {...props} ref={ref} />
  ),
);

AlaskaMooseIcon.displayName = 'AlaskaMooseIcon';
