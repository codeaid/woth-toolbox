import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import ViewSvg from './assets/View.svg';

export const ViewIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={ViewSvg} {...props} ref={ref} />
  ),
);

ViewIcon.displayName = 'ViewIcon';
