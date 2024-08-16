import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import ArcticFoxSvg from './assets/ArcticFox.svg';

export const ArcticFoxIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={ArcticFoxSvg} {...props} ref={ref} />
  ),
);

ArcticFoxIcon.displayName = 'ArcticFoxIcon';
