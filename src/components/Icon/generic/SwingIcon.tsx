import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import SwingSvg from './assets/Swing.svg';

export const SwingIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={SwingSvg} {...props} ref={ref} />
  ),
);

SwingIcon.displayName = 'SwingIcon';
