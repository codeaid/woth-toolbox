import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import WhiteTailedDeerSvg from './assets/WhiteTailedDeer.svg';

export const WhiteTailedDeerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={WhiteTailedDeerSvg} {...props} ref={ref} />
  ),
);

WhiteTailedDeerIcon.displayName = 'WhiteTailedDeerIcon';
