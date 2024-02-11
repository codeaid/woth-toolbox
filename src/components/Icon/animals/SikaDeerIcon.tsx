import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import SikaDeerSvg from './assets/SikaDeer.svg';

export const SikaDeerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={SikaDeerSvg} {...props} ref={ref} />
  ),
);

SikaDeerIcon.displayName = 'SikaDeerIcon';
