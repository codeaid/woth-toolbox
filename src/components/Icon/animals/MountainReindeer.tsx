import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import MountainReindeerSvg from './assets/MountainReindeer.svg';

export const MountainReindeerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={MountainReindeerSvg} {...props} ref={ref} />
  ),
);

MountainReindeerIcon.displayName = 'MountainReindeerIcon';
