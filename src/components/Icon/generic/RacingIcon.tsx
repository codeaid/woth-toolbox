import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import RacingSvg from './assets/Racing.svg';

export const RacingIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={RacingSvg} {...props} ref={ref} />
  ),
);

RacingIcon.displayName = 'RacingIcon';
