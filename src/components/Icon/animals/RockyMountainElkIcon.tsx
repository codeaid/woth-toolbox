import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import RockyMountainElkSvg from './assets/RockyMountainElk.svg';

export const RockyMountainElkIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={RockyMountainElkSvg} {...props} ref={ref} />
  ),
);

RockyMountainElkIcon.displayName = 'ElkIcon';
