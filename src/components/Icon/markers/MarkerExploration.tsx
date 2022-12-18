import { ForwardedRef, forwardRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import { IconProps } from '../types';
import MarkerExplorationImage from './assets/MarkerExploration.png';

export const MarkerExplorationIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={MarkerExplorationImage.src} {...props} ref={ref} />
  ),
);

MarkerExplorationIcon.displayName = 'MarkerExplorationIcon';
