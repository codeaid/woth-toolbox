import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import RoeDeerSvg from './assets/RoeDeer.svg';

export const RoeDeerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={RoeDeerSvg} {...props} ref={ref} />
  ),
);

RoeDeerIcon.displayName = 'RoeDeerIcon';
