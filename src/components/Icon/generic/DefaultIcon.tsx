import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import DefaultSvg from './assets/Default.svg';

export const DefaultIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={DefaultSvg} {...props} ref={ref} />
  ),
);

DefaultIcon.displayName = 'DefaultIcon';
