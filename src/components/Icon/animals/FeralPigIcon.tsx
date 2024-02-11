import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import FeralPigSvg from './assets/FeralPig.svg';

export const FeralPigIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={FeralPigSvg} {...props} ref={ref} />
  ),
);

FeralPigIcon.displayName = 'FeralPigIcon';
