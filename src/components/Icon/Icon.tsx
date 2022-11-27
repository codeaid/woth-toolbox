import { ForwardedRef, forwardRef, useMemo } from 'react';
import { baseUrl } from 'config/app';
import { iconMap, iconMapHighlighted } from './config';
import { MarkerProps } from './types';

export const Icon = forwardRef(
  (props: MarkerProps, ref: ForwardedRef<HTMLImageElement>) => {
    const {
      alt = '',
      className,
      highlighted = false,
      size = 128,
      style,
      title,
      type,
      onClick,
    } = props;

    // Retrieve image source file for the current type
    const imageName = useMemo(
      () =>
        (!highlighted
          ? iconMap[type]
          : iconMapHighlighted[type] ?? iconMap[type]) ?? 'default',
      [highlighted, type],
    );
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

Icon.displayName = 'Marker';
