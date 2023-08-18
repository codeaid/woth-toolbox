import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import GreaterKuduSvg from './assets/GreaterKudu.svg';

export const GreaterKuduIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={GreaterKuduSvg} {...props} ref={ref} />
  ),
);

GreaterKuduIcon.displayName = 'GreaterKuduIcon';
