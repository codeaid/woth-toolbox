import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import SitkaDeerSvg from './assets/SitkaDeer.svg';

export const SitkaDeerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={SitkaDeerSvg} {...props} ref={ref} />
  ),
);

SitkaDeerIcon.displayName = 'SitkaDeerIcon';
