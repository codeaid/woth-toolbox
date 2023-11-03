import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import type { IconProps } from '../types';
import AnimalTrophyImage from './assets/AnimalTrophy.png';

export const AnimalTrophyIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={AnimalTrophyImage.src} {...props} ref={ref} />
  ),
);

AnimalTrophyIcon.displayName = 'AnimalTrophyIcon';
