import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import EgyptianGooseSvg from './assets/EgyptianGoose.svg';

export const EgyptianGooseIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={EgyptianGooseSvg} {...props} ref={ref} />
  ),
);

EgyptianGooseIcon.displayName = 'EgyptianGooseIcon';
