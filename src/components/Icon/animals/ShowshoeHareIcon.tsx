import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import ShowshoeHareSvg from './assets/SnowshoeHare.svg';

export const ShowshoeHareIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={ShowshoeHareSvg} {...props} ref={ref} />
  ),
);

ShowshoeHareIcon.displayName = 'ShowshoeHareIcon';
