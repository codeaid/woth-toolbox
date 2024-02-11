import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import FeralGoatSvg from './assets/FeralGoat.svg';

export const FeralGoatIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={FeralGoatSvg} {...props} ref={ref} />
  ),
);

FeralGoatIcon.displayName = 'FeralGoatIcon';
