import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import FlowerSvg from './assets/Flower.svg';

export const FlowerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={FlowerSvg} {...props} ref={ref} />
  ),
);

FlowerIcon.displayName = 'FlowerIcon';
