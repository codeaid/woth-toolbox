import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import BighornSheepSvg from './assets/BighornSheep.svg';

export const BighornSheepIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={BighornSheepSvg} {...props} ref={ref} />
  ),
);

BighornSheepIcon.displayName = 'BighornSheepIcon';
