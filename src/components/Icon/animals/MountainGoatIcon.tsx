import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import MountainGoatSvg from './assets/MountainGoat.svg';

export const MountainGoatIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={MountainGoatSvg} {...props} ref={ref} />
  ),
);

MountainGoatIcon.displayName = 'MountainGoatIcon';
