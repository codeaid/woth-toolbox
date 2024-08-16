import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import NorthernLynxSvg from './assets/NorthernLynx.svg';

export const NorthernLynxIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={NorthernLynxSvg} {...props} ref={ref} />
  ),
);

NorthernLynxIcon.displayName = 'NorthernLynxIcon';
