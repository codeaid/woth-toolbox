import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import CommonWarthogSvg from './assets/CommonWarthog.svg';

export const CommonWarthogIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={CommonWarthogSvg} {...props} ref={ref} />
  ),
);

CommonWarthogIcon.displayName = 'CommonWarthogIcon';
