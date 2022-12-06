import { ForwardedRef, forwardRef } from 'react';
import { ImageIcon } from '../ImageIcon';
import { IconProps } from '../types';
import AnimalSexGeneralImage from './assets/AnimalSexGeneral.png';

export const AnimalSexGeneralIcon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ImageIcon src={AnimalSexGeneralImage.src} {...props} ref={ref} />
  ),
);

AnimalSexGeneralIcon.displayName = 'AnimalSexGeneralIcon';
