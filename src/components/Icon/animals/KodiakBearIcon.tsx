import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import KodiakBearSvg from './assets/KodiakBear.svg';

export const KodiakBearIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={KodiakBearSvg} {...props} ref={ref} />
  ),
);

KodiakBearIcon.displayName = 'KodiakBearIcon';
