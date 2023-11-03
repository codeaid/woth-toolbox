import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import type { IconProps } from '../types';
import AnimalSexFemaleImage from './assets/AnimalSexFemale.png';

export const AnimalSexFemaleIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={AnimalSexFemaleImage.src} {...props} ref={ref} />
  ),
);

AnimalSexFemaleIcon.displayName = 'AnimalSexFemaleIcon';
