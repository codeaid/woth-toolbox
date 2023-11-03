import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import SpottedHyenaSvg from './assets/SpottedHyena.svg';

export const SpottedHyenaIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={SpottedHyenaSvg} {...props} ref={ref} />
  ),
);

SpottedHyenaIcon.displayName = 'SpottedHyenaIcon';
