import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import CapeBuffaloSvg from './assets/CapeBuffalo.svg';

export const CapeBuffaloIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={CapeBuffaloSvg} {...props} ref={ref} />
  ),
);

CapeBuffaloIcon.displayName = 'CapeBuffaloIcon';
