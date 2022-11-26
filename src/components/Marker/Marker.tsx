import { ForwardedRef, forwardRef, useMemo } from 'react';
import { baseUrl } from 'config/app';
import { iconMap } from './config';
import { MarkerProps } from './types';

export const Marker = forwardRef(
  (props: MarkerProps, ref: ForwardedRef<HTMLImageElement>) => {
    const {
      alt = '',
      className,
      size = 128,
      style,
      title,
      type,
      onClick,
    } = props;

    // Retrieve image source file for the current type
    const imageName = useMemo(() => iconMap[type] ?? 'default', [type]);
    const imageSrc = useMemo(
      () => `${baseUrl}/img/markers/${imageName}.png`,
      [imageName],
    );

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={alt}
        className={className}
        draggable={false}
        height={size}
        ref={ref}
        src={imageSrc}
        style={style}
        title={title}
        width={size}
        onClick={onClick}
      />
    );
  },
);

Marker.displayName = 'Marker';
