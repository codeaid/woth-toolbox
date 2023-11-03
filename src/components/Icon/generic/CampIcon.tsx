import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import CampSvg from './assets/Camp.svg';

export const CampIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={CampSvg} {...props} ref={ref} />
  ),
);

CampIcon.displayName = 'CampIcon';
