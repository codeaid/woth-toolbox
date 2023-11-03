import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import SpringbokSvg from './assets/Springbok.svg';

export const SpringbokIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={SpringbokSvg} {...props} ref={ref} />
  ),
);

SpringbokIcon.displayName = 'SpringbokIcon';
