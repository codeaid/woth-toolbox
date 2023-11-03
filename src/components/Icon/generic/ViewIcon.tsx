import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import ViewSvg from './assets/View.svg';

export const ViewIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={ViewSvg} {...props} ref={ref} />
  ),
);

ViewIcon.displayName = 'ViewIcon';
