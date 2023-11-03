import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import GreaterKuduSvg from './assets/GreaterKudu.svg';

export const GreaterKuduIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={GreaterKuduSvg} {...props} ref={ref} />
  ),
);

GreaterKuduIcon.displayName = 'GreaterKuduIcon';
