import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import CapeBuffaloSvg from './assets/CapeBuffalo.svg';

export const CapeBuffaloIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={CapeBuffaloSvg} {...props} ref={ref} />
  ),
);

CapeBuffaloIcon.displayName = 'CapeBuffaloIcon';
