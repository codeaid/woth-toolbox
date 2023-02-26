import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import RacingSvg from './assets/Racing.svg';

export const RacingIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={RacingSvg} {...props} ref={ref} />
  ),
);

RacingIcon.displayName = 'RacingIcon';
