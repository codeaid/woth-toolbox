import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import SpringbokSvg from './assets/Springbok.svg';

export const SpringbokIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={SpringbokSvg} {...props} ref={ref} />
  ),
);

SpringbokIcon.displayName = 'SpringbokIcon';
