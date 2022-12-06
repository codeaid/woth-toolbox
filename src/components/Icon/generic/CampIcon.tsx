import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import CampSvg from './assets/Camp.svg';

export const CampIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={CampSvg} {...props} ref={ref} />
  ),
);

CampIcon.displayName = 'CampIcon';
