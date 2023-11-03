import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import WoodBisonSvg from './assets/WoodBison.svg';

export const WoodBisonIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={WoodBisonSvg} {...props} ref={ref} />
  ),
);

WoodBisonIcon.displayName = 'WoodBisonIcon';
