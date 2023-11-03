import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import type { IconProps } from '../types';
import AnimalSpeciesImage from './assets/AnimalSpecies.png';

export const AnimalSpeciesIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={AnimalSpeciesImage.src} {...props} ref={ref} />
  ),
);

AnimalSpeciesIcon.displayName = 'AnimalSpeciesIcon';
