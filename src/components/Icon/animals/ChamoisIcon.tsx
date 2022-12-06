import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import ChamoisSvg from './assets/Chamois.svg';

export const ChamoisIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={ChamoisSvg} {...props} ref={ref} />
  ),
);

ChamoisIcon.displayName = 'ChamoisIcon';
