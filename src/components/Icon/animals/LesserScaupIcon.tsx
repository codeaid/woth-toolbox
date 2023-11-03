import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import LesserScaupSvg from './assets/LesserScaup.svg';

export const LesserScaupIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={LesserScaupSvg} {...props} ref={ref} />
  ),
);

LesserScaupIcon.displayName = 'LesserScaupIcon';
