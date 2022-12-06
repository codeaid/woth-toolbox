import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import LesserScaupSvg from './assets/LesserScaup.svg';

export const LesserScaupIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={LesserScaupSvg} {...props} ref={ref} />
  ),
);

LesserScaupIcon.displayName = 'LesserScaupIcon';
