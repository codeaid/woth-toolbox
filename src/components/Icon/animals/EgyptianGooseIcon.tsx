import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import EgyptianGooseSvg from './assets/EgyptianGoose.svg';

export const EgyptianGooseIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={EgyptianGooseSvg} {...props} ref={ref} />
  ),
);

EgyptianGooseIcon.displayName = 'EgyptianGooseIcon';
