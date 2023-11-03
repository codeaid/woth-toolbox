import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import RoeDeerSvg from './assets/RoeDeer.svg';

export const RoeDeerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={RoeDeerSvg} {...props} ref={ref} />
  ),
);

RoeDeerIcon.displayName = 'RoeDeerIcon';
