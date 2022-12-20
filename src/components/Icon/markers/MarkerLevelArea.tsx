import { ForwardedRef, forwardRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import { IconProps } from '../types';
import MarkerLevelAreaImage from './assets/MarkerLevelArea.png';

export const MarkerLevelAreaIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={MarkerLevelAreaImage.src} {...props} ref={ref} />
  ),
);

MarkerLevelAreaIcon.displayName = 'MarkerLevelAreaIcon';
