import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import MountainGoatSvg from './assets/MountainGoat.svg';

export const MountainGoatIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={MountainGoatSvg} {...props} ref={ref} />
  ),
);

MountainGoatIcon.displayName = 'MountainGoatIcon';
