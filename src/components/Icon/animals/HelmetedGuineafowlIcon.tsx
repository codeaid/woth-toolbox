import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import HelmetedGuineafowlSvg from './assets/HelmetedGuineafowl.svg';

export const HelmetedGuineafowlIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={HelmetedGuineafowlSvg} {...props} ref={ref} />
  ),
);

HelmetedGuineafowlIcon.displayName = 'HelmetedGuineafowlIcon';
