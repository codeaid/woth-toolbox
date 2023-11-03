import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import HelmetedGuineafowlSvg from './assets/HelmetedGuineafowl.svg';

export const HelmetedGuineafowlIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={HelmetedGuineafowlSvg} {...props} ref={ref} />
  ),
);

HelmetedGuineafowlIcon.displayName = 'HelmetedGuineafowlIcon';
