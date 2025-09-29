import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import CommonElandSvg from './assets/CommonEland.svg';

export const CommonElandIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={CommonElandSvg} {...props} ref={ref} />
  ),
);

CommonElandIcon.displayName = 'CommonElandIcon';
