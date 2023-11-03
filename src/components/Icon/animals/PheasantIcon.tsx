import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import PheasantSvg from './assets/Pheasant.svg';

export const PheasantIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={PheasantSvg} {...props} ref={ref} />
  ),
);

PheasantIcon.displayName = 'PheasantIcon';
