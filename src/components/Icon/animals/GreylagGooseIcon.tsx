import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import GreylagGooseSvg from './assets/GreylagGoose.svg';

export const GreylagGooseIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={GreylagGooseSvg} {...props} ref={ref} />
  ),
);

GreylagGooseIcon.displayName = 'GreylagGooseIcon';
