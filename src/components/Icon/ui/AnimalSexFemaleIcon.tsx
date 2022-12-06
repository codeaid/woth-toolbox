import { ForwardedRef, forwardRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import { IconProps } from '../types';
import AnimalSexFemaleImage from './assets/AnimalSexFemale.png';

export const AnimalSexFemaleIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={AnimalSexFemaleImage.src} {...props} ref={ref} />
  ),
);

AnimalSexFemaleIcon.displayName = 'AnimalSexFemaleIcon';
