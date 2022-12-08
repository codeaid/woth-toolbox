import { ForwardedRef, forwardRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import { IconProps } from '../types';
import AnimalTrophyImage from './assets/AnimalTrophy.png';

export const AnimalTrophyIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={AnimalTrophyImage.src} {...props} ref={ref} />
  ),
);

AnimalTrophyIcon.displayName = 'AnimalTrophyIcon';
