import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import ChamoisSvg from './assets/Chamois.svg';

export const ChamoisIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={ChamoisSvg} {...props} ref={ref} />
  ),
);

ChamoisIcon.displayName = 'ChamoisIcon';
