import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import GreylagGooseSvg from './assets/GreylagGoose.svg';

export const GreylagGooseIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={GreylagGooseSvg} {...props} ref={ref} />
  ),
);

GreylagGooseIcon.displayName = 'GreylagGooseIcon';
