import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import KodiakBearSvg from './assets/KodiakBear.svg';

export const KodiakBearIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={KodiakBearSvg} {...props} ref={ref} />
  ),
);

KodiakBearIcon.displayName = 'KodiakBearIcon';
