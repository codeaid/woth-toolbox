import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import RedStagSvg from './assets/RedStag.svg';

export const RedStagIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={RedStagSvg} {...props} ref={ref} />
  ),
);

RedStagIcon.displayName = 'RedStagIcon';
