import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import ElkSvg from './assets/Elk.svg';

export const ElkIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={ElkSvg} {...props} ref={ref} />
  ),
);

ElkIcon.displayName = 'ElkIcon';
