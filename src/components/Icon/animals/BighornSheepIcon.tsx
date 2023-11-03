import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import BighornSheepSvg from './assets/BighornSheep.svg';

export const BighornSheepIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={BighornSheepSvg} {...props} ref={ref} />
  ),
);

BighornSheepIcon.displayName = 'BighornSheepIcon';
