import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import FlowerSvg from './assets/Flower.svg';

export const FlowerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={FlowerSvg} {...props} ref={ref} />
  ),
);

FlowerIcon.displayName = 'FlowerIcon';
