import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import PheasantSvg from './assets/Pheasant.svg';

export const PheasantIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={PheasantSvg} {...props} ref={ref} />
  ),
);

PheasantIcon.displayName = 'PheasantIcon';
