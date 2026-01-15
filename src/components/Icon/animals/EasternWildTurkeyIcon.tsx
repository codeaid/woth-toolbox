import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import EasternWildTurkeySvg from './assets/EasternWildTurkey.svg';

export const EasternWildTurkeyIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={EasternWildTurkeySvg} {...props} ref={ref} />
  ),
);

EasternWildTurkeyIcon.displayName = 'EasternWildTurkeyIcon';
