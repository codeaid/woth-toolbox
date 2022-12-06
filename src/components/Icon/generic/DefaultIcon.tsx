import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import DefaultSvg from './assets/Default.svg';

export const DefaultIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={DefaultSvg} {...props} ref={ref} />
  ),
);

DefaultIcon.displayName = 'DefaultIcon';
