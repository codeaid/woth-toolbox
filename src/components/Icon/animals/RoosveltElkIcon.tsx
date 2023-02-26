import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import RoosveltElkSvg from './assets/RoosveltElk.svg';

export const RoosveltElkIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={RoosveltElkSvg} {...props} ref={ref} />
  ),
);

RoosveltElkIcon.displayName = 'RoosveltElkIcon';
