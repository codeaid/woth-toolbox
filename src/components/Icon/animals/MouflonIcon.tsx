import { ForwardedRef, forwardRef } from 'react';
import { VectorIcon } from '../VectorIcon';
import { IconProps } from '../types';
import MouflonSvg from './assets/Mouflon.svg';

export const MouflonIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <VectorIcon component={MouflonSvg} {...props} ref={ref} />
  ),
);

MouflonIcon.displayName = 'MouflonIcon';
