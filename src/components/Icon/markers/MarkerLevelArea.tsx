import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import type { IconProps } from '../types';
import MarkerLevelAreaImage from './assets/MarkerLevelArea.png';

export const MarkerLevelAreaIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={MarkerLevelAreaImage.src} {...props} ref={ref} />
  ),
);

MarkerLevelAreaIcon.displayName = 'MarkerLevelAreaIcon';
