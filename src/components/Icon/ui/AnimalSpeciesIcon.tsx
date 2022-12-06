import { ForwardedRef, forwardRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import { IconProps } from '../types';
import AnimalSpeciesImage from './assets/AnimalSpecies.png';

export const AnimalSpeciesIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={AnimalSpeciesImage.src} {...props} ref={ref} />
  ),
);

AnimalSpeciesIcon.displayName = 'AnimalSpeciesIcon';
