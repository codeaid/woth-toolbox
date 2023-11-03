import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import WhiteTailedDeerSvg from './assets/WhiteTailedDeer.svg';

export const WhiteTailedDeerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={WhiteTailedDeerSvg} {...props} ref={ref} />
  ),
);

WhiteTailedDeerIcon.displayName = 'WhiteTailedDeerIcon';
