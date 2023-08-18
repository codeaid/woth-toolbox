import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import SpottedHyenaSvg from './assets/SpottedHyena.svg';

export const SpottedHyenaIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={SpottedHyenaSvg} {...props} ref={ref} />
  ),
);

SpottedHyenaIcon.displayName = 'SpottedHyenaIcon';
