import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import RossGooseSvg from './assets/RossGoose.svg';

export const RossGooseIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={RossGooseSvg} {...props} ref={ref} />
  ),
);

RossGooseIcon.displayName = 'RossGooseIcon';
