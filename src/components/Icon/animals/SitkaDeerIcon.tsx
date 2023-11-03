import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import SitkaDeerSvg from './assets/SitkaDeer.svg';

export const SitkaDeerIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={SitkaDeerSvg} {...props} ref={ref} />
  ),
);

SitkaDeerIcon.displayName = 'SitkaDeerIcon';
