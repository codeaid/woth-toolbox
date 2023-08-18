import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import SwingSvg from './assets/Swing.svg';

export const SwingIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={SwingSvg} {...props} ref={ref} />
  ),
);

SwingIcon.displayName = 'SwingIcon';
