import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import type { IconProps } from '../types';
import MouflonSvg from './assets/Mouflon.svg';

export const MouflonIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={MouflonSvg} {...props} ref={ref} />
  ),
);

MouflonIcon.displayName = 'MouflonIcon';
